export default function Loading() {
  return (
    <div className="grid gap-6 p-8 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-40 animate-pulse rounded-3xl bg-muted"
        />
      ))}
    </div>
  )
}