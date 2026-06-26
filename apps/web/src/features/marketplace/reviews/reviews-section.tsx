const reviews = [
  {
    id: "1",
    name: "Akash",
    review: "Excellent quality seeds",
  },
]

export default function ReviewsSection() {
  return (
    <div className="rounded-3xl border bg-card p-6">
      <h3 className="text-2xl font-semibold">
        Reviews
      </h3>

      <div className="mt-6 space-y-6">
        {reviews.map((review) => (
          <div key={review.id}>
            <h4 className="font-semibold">
              {review.name}
            </h4>

            <p className="mt-2 text-muted-foreground">
              {review.review}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}