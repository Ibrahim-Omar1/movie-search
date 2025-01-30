import { MoviesGridSkeleton } from "@/components/movie-skeleton"
import { SearchForm } from "@/components/search-form"
import SearchResults from "@/components/search/search-results"
import type { SearchParams } from "@/lib/types"
import type { Metadata, ResolvingMetadata } from "next"
import { redirect } from "next/navigation"
import { Suspense } from "react"

// Separate component to handle search params access
const SearchPageContent = async ({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) => {
  const params = await searchParams
  const query = params?.q || ""
  const page = Number(params?.page) || 1

  if (!query) {
    redirect("/")
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="w-full max-w-2xl space-y-4">
        <SearchForm />
      </div>

      <Suspense key={`${query}-${page}`} fallback={<MoviesGridSkeleton />}>
        <SearchResults query={query} page={page} />
      </Suspense>
    </div>
  )
}

/**
 * Generate dynamic metadata for search results page
 */
export async function generateMetadata(
  { searchParams }: { searchParams: Promise<SearchParams> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await searchParams
  const query = params?.q || ""
  const page = Number(params?.page) || 1

  // Optionally access and extend parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: query 
      ? `Search Results for "${query}" | Page ${page}` 
      : "Movie Search",
    description: `Browse movie search results for "${query}". Find detailed information about movies matching your search.`,
    openGraph: {
      title: query 
        ? `Search Results for "${query}" | Page ${page}` 
        : "Movie Search",
      description: `Browse movie search results for "${query}". Find detailed information about movies matching your search.`,
      type: "website",
      siteName: "Movie Search",
      images: [...previousImages],
    },
    twitter: {
      card: "summary_large_image",
      title: query 
        ? `Search Results for "${query}"` 
        : "Movie Search",
      description: `Browse movie search results for "${query}". Find detailed information about movies matching your search.`,
    },
  }
}

/**
 * Search Results Page Component
 * 
 * Displays search results for movie queries with:
 * - Persistent search form for new queries
 * - Grid display of matched movies
 * - Pagination for result pages
 * 
 * Features:
 * - Server-side rendering for SEO
 * - Automatic redirection if no query
 * - Suspense boundaries for loading states
 * 
 * @component
 * @param {Object} props - Component props
 * @param {SearchParams} props.searchParams - Next.js route search parameters
 * @returns {Promise<JSX.Element>} Rendered search results page
 */
const SearchPage = async ({
  searchParams,
}: {
  readonly searchParams: Promise<SearchParams>
}) => {
  return (
    <main className="container mx-auto py-6 px-4">
      <Suspense>
        <SearchPageContent searchParams={searchParams} />
      </Suspense>
    </main>
  )
}

export default SearchPage

