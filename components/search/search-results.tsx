import { MovieGrid } from "@/components/movie-grid"
import { Pagination } from "@/components/pagination"
import { searchMovies } from "@/lib/helpers/movie-api"
import { notFound } from "next/navigation"
/**
 * Props for the SearchResults component
 * @interface SearchResultsProps
 * @property {string} query - The search query string
 * @property {number} page - The current page number
 */
interface SearchResultsProps {
  query: string
  page: number
} 

/**
 * Search Results Component
 * 
 * Displays a grid of movies matching the search query with pagination.
 * Handles data fetching and error states.
 * 
 * Features:
 * - Server-side data fetching
 * - Automatic pagination calculation
 * - Error boundary with notFound() fallback
 * - Responsive grid layout
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.query - Search query string
 * @param {number} props.page - Current page number
 * @returns  Rendered search results
 * @throws {NotFoundError} When search fails or returns no results
 */
const SearchResults = async ({ query, page }: SearchResultsProps) => {
  try {
    const movies = await searchMovies(query, page)
    const totalPages = Math.ceil(Number(movies.totalResults || 0) / 10)

    return (
      <div className="w-full space-y-6">
        <MovieGrid movies={movies} />
        {movies.Response === "True" && totalPages > 1 && (
          <Pagination totalPages={totalPages} currentPage={page} />
        )}
      </div>
    )
  } catch (error) {
    // logs only in development
    console.error('Error fetching search results', error)
    notFound()
  }
}

export default SearchResults
