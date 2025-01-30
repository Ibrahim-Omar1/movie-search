import { fetchMovieById } from "@/lib/helpers/movie-api"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Badge } from "../ui/badge"
import { MovieMetadata } from "./movie-metadata"
import { MovieRatings } from "./movie-ratings"

/**
 * MovieContainer Component
 * 
 * Displays detailed information about a single movie.
 * Handles data fetching and error states.
 * 
 * Features:
 * - Server-side data fetching
 * - Error handling with notFound()
 * - Responsive layout
 * - Accessible image handling
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.id - IMDB ID of the movie to display
 */
async function MovieContainer({ id }: { id: string }) {
    const movie = await fetchMovieById(id)

    if (!movie || movie.Response === "False") {
      notFound()
    }

    return (
      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        <div className="aspect-[2/3] relative">
          <Image
            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.svg"}
            alt={`Movie poster for ${movie.Title}`}
            fill
            className="object-cover rounded-lg"
            priority
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{movie.Title}</h1>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary">{movie.Year}</Badge>
              <Badge variant="secondary">{movie.Rated}</Badge>
              <Badge variant="secondary">{movie.Runtime}</Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="font-semibold mb-2">Plot</h2>
              <p className="text-muted-foreground">{movie.Plot}</p>
            </div>

            <MovieMetadata movie={movie} />
            <MovieRatings ratings={movie.Ratings} />
          </div>
        </div>
      </div>
    )
}

export default MovieContainer
