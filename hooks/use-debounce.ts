import { useEffect, useState } from "react"

/**
 * A custom hook that debounces a value for a specified delay.
 * 
 * @param value - The value to be debounced. This can be of any type.
 * @param delay - The amount of time in milliseconds to wait before updating the debounced value. 
 *                Defaults to 500 milliseconds if not provided.
 * @returns The debounced value, which will only update after the specified delay.
 * 
 * This hook is useful for optimizing performance by limiting the number of times a value is updated,
 * especially in scenarios like input fields where the user may type quickly.
 * 
 * Example usage:
 * const debouncedSearchTerm = useDebounce(searchTerm, 300);
 */
export function useDebounce<T>(value: T, delay?: number): T {
  // State to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Set a timer to update the debounced value after the specified delay
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)
    
    // Cleanup function to clear the timer if the value or delay changes
    return () => clearTimeout(timer)
  }, [value, delay]) // Dependencies: re-run effect if value or delay changes

  // Return the debounced value
  return debouncedValue
}
