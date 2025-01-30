'use client'
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  Pagination as UIPagination,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface PaginationProps {
  /** The total number of pages */
  totalPages: number
  /** The current page number */
  currentPage: number
}

/**
 * Pagination component that renders an accessible pagination interface.
 * Uses server-side navigation with Next.js Link component.
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.totalPages - Total number of pages
 * @param {number} props.currentPage - Current active page
 */
export function Pagination({ totalPages, currentPage }: PaginationProps) {
  const searchParams = useSearchParams()

  // Generate URL for a specific page while preserving other query params
  const getPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", pageNumber.toString())
    return `?${params.toString()}`
  }

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      // Calculate middle pages
      let startPage = Math.max(currentPage - 1, 2)
      let endPage = Math.min(currentPage + 1, totalPages - 1)

      // Adjust if current page is near the start
      if (currentPage <= 3) {
        endPage = 4
      }

      // Adjust if current page is near the end
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push("ellipsis1")
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push("ellipsis2")
      }

      // Always show last page
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <UIPagination>
      <PaginationContent>
        <PaginationItem>
          <Link
            href={currentPage > 1 ? getPageUrl(currentPage - 1) : "#"}
            aria-label="Go to previous page"
            aria-disabled={currentPage <= 1}
            className={cn(
              "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              currentPage <= 1 && "pointer-events-none opacity-50"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Link>
        </PaginationItem>

        {pageNumbers.map((pageNumber, index) =>
          typeof pageNumber === "string" ? (
            <PaginationItem key={`${pageNumber}-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={pageNumber}>
              <Link
                href={getPageUrl(pageNumber)}
                aria-label={`Page ${pageNumber}`}
                aria-current={currentPage === pageNumber ? "page" : undefined}
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  currentPage === pageNumber &&
                    "pointer-events-none bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                )}
              >
                {pageNumber}
              </Link>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <Link
            href={currentPage < totalPages ? getPageUrl(currentPage + 1) : "#"}
            aria-label="Go to next page"
            aria-disabled={currentPage >= totalPages}
            className={cn(
              "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              currentPage >= totalPages && "pointer-events-none opacity-50"
            )}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Link>
        </PaginationItem>
      </PaginationContent>
    </UIPagination>
  )
}

