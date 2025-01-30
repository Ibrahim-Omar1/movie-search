import { MoviesGridSkeleton } from "@/components/movie-skeleton"
import PopularMovies from "@/components/PopularMovies"
import { SearchForm } from "@/components/search-form"
import type { SearchParams } from "@/lib/types"
import type { Metadata } from "next"
import { Suspense } from "react"

/**
 * Static metadata for the home page
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/metadata
 */
export const metadata: Metadata = {
  title: "Movie Search | Popular Movies",
  description: "Search and discover popular movies from OMDB database. Browse through a vast collection of movies with detailed information.",
  keywords: ["movies", "search", "OMDB", "film database", "movie information"],
  openGraph: {
    title: "Movie Search | Popular Movies",
    description: "Search and discover popular movies from OMDB database",
    url: "http://localhost:3000",
    type: "website",
    siteName: "Movie Search",
    locale: "en_US",
    images: [
      {
        url: "/opengraph.jpg", // You'll need to add this image to your public folder
        width: 1200,
        height: 630,
        alt: "Movie Search",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Movie Search | Popular Movies",
    description: "Search and discover popular movies from OMDB database",
    images: ["/opengraph.jpg"],
    creatorId: "ebrahim_omar4",
    siteId: "ebrahim_omar4",
    site: "ebrahim_omar4",
  },
}

// Separate component to handle searchParams access
const HomePageContent = async ({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) => {
  const params = await searchParams
  const page = Number(params?.page) || 1

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="w-full max-w-2xl space-y-4">
        <h1 className="text-3xl font-bold text-center">Movie Search</h1>
        <SearchForm />
      </div>

      <Suspense key={page} fallback={<MoviesGridSkeleton />}>
        <PopularMovies page={page} />
      </Suspense>
    </div>
  )
}

/**
 * Home Page Component
 * 
 * Renders the main landing page of the movie application featuring:
 * - Search form for movie queries
 * - Grid display of popular movies
 * - Pagination for browsing multiple pages
 * 
 * Uses Server Components for initial data fetching and Suspense for loading states.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Promise<SearchParams>} props.searchParams - Next.js route search parameters
 * @returns Rendered home page
 */
const HomePage = async ({
  searchParams,
}: {
  readonly searchParams: Promise<SearchParams>
}) => {
  return (
    <main className="container mx-auto py-6 px-4">
      <Suspense>
        <HomePageContent searchParams={searchParams} />
      </Suspense>
    </main>
  )
}

export default HomePage