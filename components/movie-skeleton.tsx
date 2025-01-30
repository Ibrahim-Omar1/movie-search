export function MovieSkeleton() {
  return (
    <div className="space-y-4">
      <div className="aspect-[2/3] bg-muted rounded-lg animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
        <div className="h-4 w-1/4 bg-muted rounded animate-pulse" />
      </div>
    </div>
  )
}

export function MoviesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
      {Array.from({ length: 8 }).map((_, i) => (
        <MovieSkeleton key={i} />
      ))}
    </div>
  )
}

