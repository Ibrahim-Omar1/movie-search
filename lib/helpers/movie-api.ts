import ky from "@/lib/ky"
import { MovieDetails, MovieSearchResponse } from "@/lib/types"

const API_KEY = process.env.OMDB_API_KEY as string

/**
 * Fetches popular movies from OMDB API
 * 
 * @param {number} page - Page number for pagination (default: 1)
 * @returns {Promise<MovieSearchResponse>} Movie search results
 * @throws {Error} When API request fails or returns error response
 */
export async function fetchPopularMovies(page = 1): Promise<MovieSearchResponse> {
  try {
    const data = await ky
      .get("", {
        searchParams: {
          apikey: API_KEY,
          s: "movie",
          type: "movie",
          page: String(page),
        },
      })
      .json<MovieSearchResponse>()

    if (data.Response === "False") {
      throw new Error(data.Error || "Failed to fetch movies")
    }

    return data
  } catch (error) {
    // logs only in development
    console.error('Error fetching popular movies', error)
    throw new Error("Failed to fetch movies")
  }
}

/**
 * Fetches detailed movie information by ID
 * 
 * @param {string} id - IMDB ID of the movie
 * @returns {Promise<MovieDetails>} Detailed movie information
 * @throws {Error} When API request fails or movie not found
 */
export async function fetchMovieById(id: string): Promise<MovieDetails> {
  try {
    const data = await ky
      .get("", {
        searchParams: {
          apikey: API_KEY,
          i: id,
          plot: "full",
        },
      })
      .json<MovieDetails>()

    if (data.Response === "False") {
      throw new Error(data.Error || "Failed to fetch movie")
    }

    return data
  } catch (error) {
    // logs only in development
    console.error('Error fetching movie by id', error)
    throw new Error("Failed to fetch movie")
  }
}

/**
 * Searches movies by query string
 * 
 * @param {string} query - Search query string
 * @param {number} page - Page number for pagination (default: 1)
 * @returns {Promise<MovieSearchResponse>} Movie search results
 * @throws {Error} When query is empty or API request fails
 */
export async function searchMovies(query: string, page = 1): Promise<MovieSearchResponse> {
  try {
    if (!query) {
      throw new Error("Search query is required")
    }

    const data = await ky
      .get("", {
        searchParams: {
          apikey: API_KEY,
          s: query,
          page: String(page),
        },
      })
      .json<MovieSearchResponse>()

    if (data.Response === "False") {
      throw new Error(data.Error || "Failed to search movies")
    }

    return data
  } catch (error) {
    // logs only in development
    console.error('Error searching movies', error)
    throw new Error("Failed to search movies")
  }
} 