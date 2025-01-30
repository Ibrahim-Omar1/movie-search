import api, { HTTPError, NormalizedOptions, type BeforeErrorHook } from 'ky';

/**
 * Base URL for API requests, fallback to production URL if not specified
 */
const baseURL = process.env.NEXT_PUBLIC_BASE_URL as string;

/**
 * Utility function to normalize and clean API URLs
 *
 * @param url - Raw URL that might contain protocol, domain, or duplicate paths
 * @returns Cleaned URL with correct base and path
 */
const getCleanUrl = (url: string): string => {
  const path = url.replace(/^https?:\/\/[^/]+\//, '').replace(/^\/+/, '');
  return path ? `${baseURL}/${path}` : baseURL;
};

/**
 * Custom error class for standardized API error handling
 * Extends Ky's HTTPError to maintain type compatibility while adding stack traces
 *
 * @extends {HTTPError}
 */
class APIError extends HTTPError {
  public stack: string;

  constructor(
    message: string,
    public readonly status: number,
    response: Response,
    request: Request,
    options: NormalizedOptions,
    stack?: string
  ) {
    super(response, request, options);
    this.name = 'APIError';
    this.message = message;
    this.stack = stack || new Error().stack || '';
  }
}

/**
 * Creates a standardized error log object for consistent error reporting
 *
 * @param error - The HTTP error that occurred
 * @param url - The full URL where the error occurred
 * @returns Formatted error log object with stack trace and metadata
 */
const createErrorLog = (error: HTTPError, url: string) => ({
  url,
  method: error.request?.method || 'GET',
  status: error.response?.status,
  message: error.message,
  stack: error.stack || new Error().stack,
  timestamp: new Date().toISOString(),
});

/**
 * Configured Ky instance with optimized settings for API requests
 *
 * Features:
 * - Smart retries with exponential backoff for failed requests
 * - Performance monitoring with Web Performance API
 * - Intelligent caching strategies based on response status
 * - Comprehensive error handling with stack traces
 * - Request/Response lifecycle hooks for monitoring
 *
 * Cache Strategy:
 * - 404 responses: 5 minutes with stale-while-revalidate
 * - Successful responses: 6 hours with stale-while-revalidate
 * - Error responses: No caching
 *
 * Error Handling:
 * - Detailed error logs with stack traces
 * - Custom error types for different failure modes
 * - Consistent error formatting and reporting
 */
const ky = api.create({
  prefixUrl: baseURL,

  next: {
    revalidate: 86400, // cache for 1 day
  },
  retry: 0,
  // Retry configuration with exponential backoff
  // retry: {
  //   limit: 2,
  //   methods: ['get'],
  //   statusCodes: [408, 413, 429, 500, 502, 503, 504],
  //   backoffLimit: 3000,
  //   delay: retryCount => Math.min(1000 * 2 ** retryCount, 3000),
  // },

  hooks: {
    beforeRequest: [
      request => {
        // Create a new Headers object from the existing request headers
        const newHeaders = new Headers(request.headers);

        // Set the 'Accept' header to 'application/json' to indicate that the client expects JSON responses
        newHeaders.set('Accept', 'application/json');

        // Set the 'X-Requested-With' header to 'XMLHttpRequest' to identify the request as an AJAX request
        newHeaders.set('X-Requested-With', 'XMLHttpRequest');

        // Extract the path from the request URL and use it to mark the start of the request in the performance timeline
        const path = request.url.replace(/^https?:\/\/[^/]+\//, '');
        performance.mark(`req-${path}`);

        // For GET requests, set default cache control headers
        // The server can override these with its own cache headers if needed
        if (request.method === 'GET') {
          newHeaders.set('Cache-Control', 'public, max-age=21600, stale-while-revalidate=60');
        }

        // Return a new Request object with the updated headers
        return new Request(request, { headers: newHeaders });
      },
    ],

    afterResponse: [
      (_request, _options, response) => {
        // Measure request duration
        const path = response.url.replace(/^https?:\/\/[^/]+\//, '');
        const reqMark = `req-${path}`;

        if (performance.getEntriesByName(reqMark).length > 0) {
          performance.measure(`api-${path}`, reqMark);
          performance.clearMarks(reqMark);
        }

        return response;
      },
    ],

    beforeError: [
      ((error: HTTPError): HTTPError => {
        if (!(error instanceof HTTPError)) {
          return error;
        }

        const { response, request, options } = error;
        const stack = error.stack || new Error().stack;

        // Handle HTTP errors with response
        if (response && request) {
          const fullUrl = getCleanUrl(request.url);
          if (fullUrl !== baseURL) {
            console.error('API Error:', {
              ...createErrorLog(error, fullUrl),
              response: {
                status: response.status,
                statusText: response.statusText,
              },
            });
          }

          return new APIError(
            `${response.status} ${response.statusText} - ${fullUrl}`,
            response.status,
            response,
            request,
            options,
            stack
          );
        }

        // Handle network and timeout errors
        const fullUrl = request ? getCleanUrl(request.url) : baseURL;
        if (fullUrl !== baseURL) {
          switch (error.name) {
            case 'TypeError':
              return new APIError(
                `Network error - ${fullUrl}`,
                0,
                new Response(null, { status: 0, statusText: 'Network Error' }),
                request,
                options,
                stack
              );
            case 'TimeoutError':
              return new APIError(
                `Request timed out - ${fullUrl}`,
                408,
                new Response(null, { status: 408, statusText: 'Request Timeout' }),
                request,
                options,
                stack
              );
            case 'AbortError':
              return new APIError(
                `Request aborted - ${fullUrl}`,
                499,
                new Response(null, { status: 499, statusText: 'Client Closed Request' }),
                request,
                options,
                stack
              );
          }
        }

        // Handle unknown errors
        return new APIError(
          error.message || 'Unknown error occurred',
          500,
          new Response(null, { status: 500, statusText: 'Internal Server Error' }),
          request,
          options,
          stack
        );
      }) as BeforeErrorHook,
    ],
  },
});

export default ky;