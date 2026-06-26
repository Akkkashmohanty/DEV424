"use client"

export default function VideoFilters() {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <select className="h-12 rounded-2xl border bg-background px-4">
        <option>All States</option>
        <option>Karnataka</option>
        <option>Odisha</option>
      </select>

      <select className="h-12 rounded-2xl border bg-background px-4">
        <option>All Languages</option>
        <option>Kannada</option>
        <option>Hindi</option>
      </select>

      <input
        placeholder="Search tutorials"
        className="h-12 flex-1 rounded-2xl border bg-background px-4"
      />
    </div>
  )
}