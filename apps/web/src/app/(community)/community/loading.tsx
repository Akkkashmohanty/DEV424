export default function Loading() {
  return (
    <div className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 9 }).map((_, index) => (
        <div
          key={index}
          className="h-60 animate-pulse rounded-3xl bg-muted"
        />
      ))}
    </div>
  )
}