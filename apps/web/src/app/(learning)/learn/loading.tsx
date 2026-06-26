export default function Loading() {
  return (
    <div className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="aspect-video animate-pulse rounded-3xl bg-muted"
        />
      ))}
    </div>
  )
}