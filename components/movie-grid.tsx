import { Alert, AlertDescription } from "@/components/ui/alert"
import type { MovieSearchResponse } from "@/lib/types"
import { AlertCircle } from "lucide-react"
import MovieCard from "./movie-card"

export function MovieGrid({ movies }: { movies: MovieSearchResponse | null }) {
  if (!movies) {
    return null
  }

  if (movies.Error) {
    return (
      <Alert variant="destructive" className="max-w-2xl">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{movies.Error}</AlertDescription>
      </Alert>
    )
  }

  if (!movies.Search?.length) {
    return (
      <Alert className="max-w-2xl">
        <AlertDescription>No movies found.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full">
      {movies.Search.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  )
}

