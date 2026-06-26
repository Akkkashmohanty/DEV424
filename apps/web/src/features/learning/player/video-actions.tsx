"use client"

import { Heart, Bookmark } from "lucide-react"

export default function VideoActions() {
  return (
    <div className="mt-4 flex gap-4">
      <button className="flex items-center gap-2 rounded-2xl border px-5 py-3">
        <Heart className="h-5 w-5" />

        Like
      </button>

      <button className="flex items-center gap-2 rounded-2xl border px-5 py-3">
        <Bookmark className="h-5 w-5" />

        Save
      </button>
    </div>
  )
}