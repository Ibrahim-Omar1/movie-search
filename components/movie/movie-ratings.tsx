import { Rating } from "@/lib/types"

interface MovieRatingsProps {
  ratings: Rating[]
}

export const MovieRatings = ({ ratings }: MovieRatingsProps) => {
  if (!ratings?.length) return null

  return (
    <div>
      <h2 className="font-semibold mb-2">Ratings</h2>
      <div className="grid gap-2">
        {ratings.map((rating) => (
          <div key={rating.Source}>
            <span className="font-medium">{rating.Source}:</span>{" "}
            <span className="text-muted-foreground">{rating.Value}</span>
          </div>
        ))}
      </div>
    </div>
  )
} 