import MovieContainer from "@/components/movie/MovieContainer"
import MovieDetailsSkeleton from "@/components/movie/MovieDetailsSkeleton"
import { Button } from "@/components/ui/button"
import { fetchMovieById, fetchPopularMovies } from "@/lib/helpers/movie-api"
import { ChevronLeft } from "lucide-react"
import type { Metadata, ResolvingMetadata } from "next"
import Link from "next/link"
import { Suspense } from "react"

// Separate component to handle params access
const MoviePageContent = async ({
  params
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  
  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Search
        </Link>
      </Button>

      <Suspense fallback={<MovieDetailsSkeleton />}>
        <MovieContainer id={id} />
      </Suspense>
    </div>
  )
}

/**
 * Generate dynamic metadata for movie details page
 */
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const { id } = await params
    const movie = await fetchMovieById(id)

    if (!movie || movie.Response === "False") {
      return {
        title: "Movie Not Found",
        description: "The requested movie could not be found.",
      }
    }

    const previousImages = (await parent).openGraph?.images || []

    return {
      title: `${movie.Title} (${movie.Year})`,
      description: movie.Plot,
      keywords: [
        movie.Title,
        movie.Year,
        movie.Director,
        movie.Actors.split(", "),
        movie.Genre.split(", "),
        "movie",
        "film",
      ].flat(),
      openGraph: {
        title: `${movie.Title} (${movie.Year})`,
        description: movie.Plot,
        type: "video.movie",
        siteName: "Movie Search",
        images: [
          {
            url: movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg",
            alt: movie.Title,
          },
          ...previousImages,
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${movie.Title} (${movie.Year})`,
        description: movie.Plot,
        images: [movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"],
      },
    }
  } catch (error) {
    // logs only in development
    console.error('Error generating metadata', error)
    return {
      title: "Error",
      description: "Failed to load movie details",
    }
  }
}


/**
 * Generate static paths for popular movies at build time
 * 
 * @returns {Promise<Array<{id: string}>>} Array of movie IDs to pre-render
 */
export async function generateStaticParams() {
  const [moviesPage1, moviesPage2] = await Promise.all([
    fetchPopularMovies(1),
    fetchPopularMovies(2),
  ]);

  // Ensure moviesPage1.Search and moviesPage2.Search are defined
  const movies1 = moviesPage1.Search || [];
  const movies2 = moviesPage2.Search || [];

  return [...movies1, ...movies2].map((movie) => ({
    id: movie?.imdbID,
  }));
}


/**
 * Movie Page Component
 * 
 * Displays details for a single movie.
 * 
 * Features:
 * - Static generation for popular movies
 * - Server-side rendering for SEO
 * - Dynamic metadata based on movie details
 * - Suspense boundaries for loading states
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Promise<{ id: string }>} props.params - Next.js route parameters
 * @returns Rendered movie details page
 */
const MoviePage = ({
  params,
}: {
  readonly params: Promise<{ id: string }>
}) => {
  return (
    <main className="container mx-auto py-6 px-4">
      <Suspense>
        <MoviePageContent params={params} />
      </Suspense>
    </main>
  )
}

export default MoviePage

