import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Movie } from "@/lib/types"
import Image from "next/image"
import Link from "next/link"

/**
 * MovieCard Component
 * 
 * This component renders a card for displaying movie information.
 * It includes a clickable link that navigates to the movie's detail page.
 * 
 * Props:
 * - movie: An object containing movie details, which must include:
 *   - imdbID: Unique identifier for the movie (string)
 *   - Poster: URL of the movie poster image (string)
 *   - Title: Title of the movie (string)
 *   - Year: Release year of the movie (string)
 * 
 * Features:
 * - Displays the movie poster with a fallback placeholder if the poster is not available.
 * - Shows the movie title and year in a structured layout.
 * - Utilizes Tailwind CSS for styling and responsive design.
 * - Implements a hover effect to enhance user interaction.
 * 
 * Accessibility:
 * - The image has an alt attribute for screen readers, providing the movie title.
 * 
 * @param {Object} props - Component props
 * @param {Movie} props.movie - The movie object containing details to display
 * @returns  Rendered MovieCard component
 */
const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Link href={`/movie/${movie.imdbID}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className="aspect-[1/1.2] relative"> {/* Changed aspect ratio for a smaller card */}
            <Image
              src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.svg"}
              alt={movie.Title} // Provides a description of the image for accessibility
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive image sizes
              priority // Indicates that this image should be prioritized for loading
            />
          </div>
        </CardContent>
        <CardFooter className="p-4">
          <div>
            <h2 className="font-semibold line-clamp-1">{movie.Title}</h2> {/* Title of the movie */}
            <p className="text-sm text-muted-foreground">{movie.Year}</p> {/* Release year of the movie */}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
export default MovieCard;