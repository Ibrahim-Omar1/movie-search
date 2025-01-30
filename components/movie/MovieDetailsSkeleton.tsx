import { MovieSkeleton } from "../movie-skeleton"

function MovieDetailsSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-[300px_1fr]">
      <MovieSkeleton />
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="h-8 w-3/4 bg-muted rounded animate-pulse" />
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-5 w-16 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-40 bg-muted rounded animate-pulse" />
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-4 w-full bg-muted rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailsSkeleton
