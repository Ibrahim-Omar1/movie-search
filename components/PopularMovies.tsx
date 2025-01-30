import { fetchPopularMovies } from "@/lib/helpers/movie-api"
import { MovieGrid } from "./movie-grid"
import { Pagination } from "./pagination"

const PopularMovies = async ({ page }: { page: number }) => {
  const movies = await fetchPopularMovies(page)
  const totalPages = Math.ceil(Number(movies.totalResults || 0) / 10)

  return (
    <div className="w-full space-y-6">
      <MovieGrid movies={movies} />
      {movies.Response === "True" && totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={page} />
      )}
    </div>
  )
}

export default PopularMovies
