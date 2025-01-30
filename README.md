# Movie Search Application

A modern, responsive movie search application built with Next.js 15, TypeScript, and the OMDB API. This application allows users to search for movies, view detailed information, and discover popular films.

## Features

- 🎬 Search movies from OMDB database
- 📱 Responsive design for all devices
- 🖼️ Dynamic OpenGraph images for social sharing
- ⚡ Server-side rendering and static generation
- 🎨 Modern UI with Tailwind CSS and shadcn/ui
- 🔍 Real-time search with debouncing
- 📄 Pagination for search results
- 🎯 Accessibility features
- 💨 Edge runtime for optimal performance

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Fonts:** Geist Sans & Geist Mono
- **Image Optimization:** next/image
- **API Integration:** OMDB API
- **Deployment:** Vercel

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── movie/[id]/        # Movie details page
│   │   ├── opengraph-image.tsx  # Dynamic OG image
│   │   └── page.tsx       # Movie details component
│   ├── search/           # Search results page
│   │   ├── opengraph-image.tsx  # Dynamic OG image
│   │   └── page.tsx      # Search results component
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── movie/           # Movie-related components
│   │   ├── movie-container.tsx
│   │   ├── movie-metadata.tsx
│   │   └── movie-ratings.tsx
│   ├── search/          # Search-related components
│   │   └── search-results.tsx
│   └── ui/              # Shared UI components
│       ├── button.tsx
│       ├── card.tsx
│       └── input.tsx
├── lib/                 # Utility functions
│   ├── helpers/         # Helper functions
│   │   └── movie-api.ts # API integration
│   ├── types.ts         # TypeScript types
│   ├── utils.ts         # Utility functions
│   └── ky.ts           # API client configuration
├── hooks/               # Custom React hooks
│   └── use-debounce.ts # Debounce hook
└── public/             # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- OMDB API key

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
OMDB_API_KEY=your_api_key_here
NEXT_PUBLIC_API_URL=http://www.omdbapi.com
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Ibrahim-Omar1/movie-search
cd movie-search
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Core Components

### MovieContainer
```typescript
// components/movie/MovieContainer.tsx
// Displays detailed movie information with poster and metadata
interface MovieContainerProps {
  id: string;
}
```

### SearchForm
```typescript
// components/search/search-form.tsx
// Handles user input with debouncing and navigation
export function SearchForm() {
  // Implementation details...
}
```

### MovieGrid
```typescript
// components/movie-grid.tsx
// Displays a responsive grid of movie cards
interface MovieGridProps {
  movies: MovieSearchResponse;
}
```

## API Integration

The application uses the OMDB API for movie data:

```typescript
// lib/helpers/movie-api.ts
export async function fetchMovieById(id: string): Promise<MovieDetails>
export async function searchMovies(query: string, page: number): Promise<MovieSearchResponse>
```

## Type Definitions

Key TypeScript interfaces:

```typescript
interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface MovieDetails extends Movie {
  Plot: string;
  Director: string;
  Actors: string;
  // ... other fields
}
```

## Performance Optimizations

1. **Edge Runtime**
   - OpenGraph images generated at the edge
   - Reduced latency for dynamic content

2. **Image Optimization**
   - next/image for automatic optimization
   - Responsive images with appropriate sizes
   - Lazy loading implementation

3. **Caching Strategy**
   - Static generation for popular movies
   - Revalidation periods for dynamic data
   - Client-side caching with headers

## Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation
- Focus management
- Screen reader support
- Color contrast compliance

## Error Handling

The application implements comprehensive error handling:

- API error boundaries
- Fallback UI components
- User-friendly error messages
- Development logging
- Type safety checks

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Deployment

The application is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add environment variables
4. Deploy!

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [OMDB API](http://www.omdbapi.com/)
- [Vercel](https://vercel.com/)
