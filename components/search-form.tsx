"use client"

// Import necessary components and libraries
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchParams } from "@/lib/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

/**
 * Interface for the SearchForm component
 * @interface
 * @property {SearchParams} searchParams - The search parameters
 */
interface SearchFormProps {
  searchParams: SearchParams 
}

/**
 * Define the validation schema using Zod
 */
const formSchema = z.object({
  searchTerm: z.string().min(2, "Search term must be at least 2 characters"), // Validate that searchTerm is at least 2 characters long
})

/**
 * Functional component for the search form
 * @param {SearchFormProps} props - The component props
 * @param {SearchParams} props.searchParams - The search parameters
 * @param {string} props.searchParams.q - The search query
 * @param {string} props.searchParams.page - The page number
 * @returns  The rendered search form
 */
const SearchForm = ({ searchParams }: SearchFormProps) => {
  const router = useRouter() // Initialize the router for navigation
  const query = searchParams.q ?? "" // Get the current search query or default to an empty string

  // Initialize the form with react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // Use Zod for validation
    defaultValues: {
      searchTerm: searchParams.q, // Set default value for searchTerm from searchParams
    },
  })

  // Function to clear the search input and navigate to the home page
  const handleClear = () => {
    router.push("/") // Navigate to the home page
  }

  // Function to handle form submission
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const params = new URLSearchParams() // Create a new URLSearchParams object
    params.set("q", data.searchTerm) // Set the search term in the query parameters
    router.push(`/search?${params.toString()}`) // Navigate to the search results page with the query
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}> 
      <div className="relative"> 
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /> 
        <Input 
          {...register("searchTerm")} // Register the input with react-hook-form
          type="text" 
          placeholder="Search for movies..." 
          defaultValue={query} // Set default value for the input
          className={cn("pl-9 pr-12", errors.searchTerm && "border-red-500 focus-visible:ring-red-500")} // Apply conditional classes
        />
        {query && ( // If there is a query, show the clear button
          <Button
            type="button" // Button type for non-submit action
            variant="ghost" 
            size="icon" 
            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 hover:bg-transparent"
            onClick={handleClear} 
          >
            <X className="h-4 w-4" aria-hidden="true"/>
            <span className="sr-only">Clear search</span> {/* Screen reader only text for accessibility */}
          </Button>
        )}
      </div>
      {
        errors.searchTerm && ( // Display error message if validation fails
          <p className="text-red-500 text-sm">{errors.searchTerm.message}</p> // Error message styling
        )
      }
    </form>
  )
}

export default SearchForm;