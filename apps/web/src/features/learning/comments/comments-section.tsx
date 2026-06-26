const comments = [
  {
    id: "1",
    name: "Akash",
    text: "Amazing tutorial",
  },
]

export default function CommentsSection() {
  return (
    <div className="rounded-3xl border bg-card p-6">
      <h3 className="text-2xl font-semibold">
        Comments
      </h3>

      <div className="mt-6 space-y-5">
        {comments.map((comment) => (
          <div key={comment.id}>
            <h4 className="font-medium">
              {comment.name}
            </h4>

            <p className="mt-2 text-muted-foreground">
              {comment.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}