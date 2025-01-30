"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type React from "react" // Import React

export function SearchForm() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const query = searchParams.get("q") ?? ""
  const isSearchPage = pathname === "/search"

  const handleSearch = (value: string) => {
    if (!value) return

    const params = new URLSearchParams()
    params.set("q", value)
    router.push(`/search?${params.toString()}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const value = formData.get("search") as string
    if (value) handleSearch(value)
  }

  const handleClear = () => {
    if (isSearchPage) {
      router.push("/")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input name="search" type="text" placeholder="Search for movies..." className="pl-9 pr-12" defaultValue={query} />
      {query && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 hover:bg-transparent"
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
    </form>
  )
}

