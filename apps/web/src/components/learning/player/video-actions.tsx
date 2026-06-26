"use client"

import { useState } from "react"
import { ThumbsUp, Share2, Bookmark, FileEdit, Check, Award } from "lucide-react"

export default function VideoActions() {
  const [likes, setLikes] = useState(2400)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [notes, setNotes] = useState("")
  const [savedNotes, setSavedNotes] = useState<string[]>([])

  const toggleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1)
    setIsLiked(!isLiked)
  }

  const toggleSave = () => {
    setIsSaved(!isSaved)
  }

  const saveNote = (e: React.FormEvent) => {
    e.preventDefault()
    if (!notes.trim()) return
    setSavedNotes([...savedNotes, notes.trim()])
    setNotes("")
  }

  return (
    <div className="mt-4 space-y-4">
      {/* Action Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div className="flex items-center gap-2">
          {/* Likes */}
          <button
            onClick={toggleLike}
            className={`flex items-center gap-1.5 h-9 px-4 rounded-xl border text-xs font-semibold transition ${
              isLiked
                ? "bg-green-600 border-green-600 text-white"
                : "border-border hover:bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <ThumbsUp className={`h-4 w-4 ${isLiked ? "fill-white" : ""}`} />
            <span>{likes}</span>
          </button>

          {/* Bookmarks */}
          <button
            onClick={toggleSave}
            className={`flex items-center justify-center h-9 w-9 rounded-xl border transition ${
              isSaved
                ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                : "border-border hover:bg-muted text-muted-foreground"
            }`}
            title="Bookmark course"
          >
            <Bookmark className={`h-4.5 w-4.5 ${isSaved ? "fill-amber-500" : ""}`} />
          </button>

          {/* Share */}
          <button className="flex items-center justify-center h-9 w-9 border border-border text-muted-foreground hover:bg-muted hover:text-foreground rounded-xl transition">
            <Share2 className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Study Notes Toggle */}
        <button
          onClick={() => setShowNotes(!showNotes)}
          className={`flex items-center gap-1.5 h-9 px-4 rounded-xl border text-xs font-semibold transition ${
            showNotes
              ? "bg-purple-500/10 border-purple-500/30 text-purple-600"
              : "border-border hover:bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileEdit className="h-4 w-4" />
          <span>Farming Study Notes</span>
        </button>
      </div>

      {/* Study Notes Console */}
      {showNotes && (
        <div className="rounded-2xl border border-border bg-muted/10 p-5 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center gap-1 text-xs font-bold text-muted-foreground uppercase">
            <Award className="h-4 w-4 text-purple-500" />
            <span>Classroom Scratchpad</span>
          </div>

          <form onSubmit={saveNote} className="space-y-3">
            <textarea
              placeholder="Jot down notes, pest remedies, or light placements..."
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg h-8 px-3 font-bold text-[10px] transition"
              >
                Save Study Note
              </button>
            </div>
          </form>

          {savedNotes.length > 0 && (
            <div className="space-y-2 border-t border-border/50 pt-4">
              <span className="text-[10px] font-bold text-muted-foreground">RECENT NOTES</span>
              {savedNotes.map((n, i) => (
                <div key={i} className="flex gap-2 p-2.5 bg-background border border-border/50 rounded-xl text-xs leading-normal">
                  <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>{n}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
