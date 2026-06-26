"use client"

export default function ProductFilters() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <input
        placeholder="Search products"
        className="h-12 flex-1 rounded-2xl border bg-background px-4"
      />

      <select className="h-12 rounded-2xl border bg-background px-4">
        <option>All Categories</option>

        <option>Seeds</option>

        <option>Soil</option>

        <option>Pots</option>

        <option>Compost</option>
      </select>

      <select className="h-12 rounded-2xl border bg-background px-4">
        <option>Sort By</option>

        <option>Price Low To High</option>

        <option>Price High To Low</option>
      </select>
    </div>
  )
}