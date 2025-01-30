import { MovieDetails } from "@/lib/types"

interface MovieMetadataProps {
  movie: MovieDetails
}

export const MovieMetadata = ({ movie }: MovieMetadataProps) => {
  return (
    <div className="grid gap-2">
      <div>
        <span className="font-semibold">Director:</span>{" "}
        <span className="text-muted-foreground">{movie.Director}</span>
      </div>
      <div>
        <span className="font-semibold">Cast:</span>{" "}
        <span className="text-muted-foreground">{movie.Actors}</span>
      </div>
      <div>
        <span className="font-semibold">Genre:</span>{" "}
        <span className="text-muted-foreground">{movie.Genre}</span>
      </div>
      {movie.Awards !== "N/A" && (
        <div>
          <span className="font-semibold">Awards:</span>{" "}
          <span className="text-muted-foreground">{movie.Awards}</span>
        </div>
      )}
    </div>
  )
} 