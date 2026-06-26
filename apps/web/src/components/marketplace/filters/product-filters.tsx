"use client"

import { useState } from "react"
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react"

const categories = ["All", "Seeds", "Soil", "Tools", "Fertilizers", "Pots"]
const sortOptions = ["Best Sellers", "Price: Low to High", "Price: High to Low", "Highest Rating"]

export default function ProductFilters() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("Best Sellers")

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-4">
      {/* Search and Sort row */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search crop seeds, tools, organic fertilizers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
          />
        </div>

        {/* Sorting Dropdown */}
        <div className="flex w-full sm:w-auto items-center gap-2 border border-border bg-background rounded-xl h-11 px-3 cursor-pointer">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-full border-0 bg-transparent text-xs font-semibold focus:outline-none cursor-pointer pr-6 appearance-none flex-1 sm:flex-none"
          >
            {sortOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 pt-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-4 py-2 rounded-xl border font-bold transition-all ${
                isActive
                  ? "bg-green-600 border-green-600 text-white shadow-sm"
                  : "bg-background border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          )
        })}
      </div>
    </div>
  )
}
