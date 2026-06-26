"use client"

import { useState } from "react"
import { MessageSquare, ThumbsUp, Send } from "lucide-react"

interface Comment {
  id: number
  author: string
  avatar: string
  time: string
  content: string
  likes: number
  isLiked?: boolean
}

const initialComments: Comment[] = [
  {
    id: 1,
    author: "Aditya Hegde",
    avatar: "A",
    time: "2 hours ago",
    content:
      "Absolutely critical tip regarding the companion planting. Tried putting sweet basil near my tomatoes, and noticed a drastic drop in whiteflies within a week!",
    likes: 18,
  },
  {
    id: 2,
    author: "Priya Sundaram",
    avatar: "P",
    time: "5 hours ago",
    content:
      "Is there a specific potting soil mixture layout recommended for balconies that face direct heavy rain? Mine gets soggy fast.",
    likes: 5,
  },
]

export default function CommentsSection() {
  const [comments, setComments] =
    useState<Comment[]>(initialComments)

  const [newComment, setNewComment] =
    useState("")

  const toggleLike = (id: number) => {
    setComments(
      comments.map((c) =>
        c.id === id
          ? {
            ...c,
            likes: c.isLiked
              ? c.likes - 1
              : c.likes + 1,
            isLiked: !c.isLiked,
          }
          : c,
      ),
    )
  }

  const addComment = (
    e: React.FormEvent,
  ) => {
    e.preventDefault()

    if (!newComment.trim()) return

    const commentItem: Comment = {
      id: Date.now(),
      author: "Urban Farmer (You)",
      avatar: "U",
      time: "Just now",
      content: newComment.trim(),
      likes: 0,
      isLiked: false,
    }

    setComments([
      commentItem,
      ...comments,
    ])

    setNewComment("")
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-green-600" />

        <h3 className="text-xl font-bold tracking-tight">
          Class Discussions
        </h3>

        <span className="text-xs text-muted-foreground">
          ({comments.length})
        </span>
      </div>

      <form
        onSubmit={addComment}
        className="mb-8 flex gap-3"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-green-200 bg-green-500/10 text-xs font-extrabold text-green-700">
          U
        </span>

        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Ask a question or share your balcony garden setup tips..."
            value={newComment}
            onChange={(e) =>
              setNewComment(
                e.target.value,
              )
            }
            className="h-10 w-full rounded-xl border border-border bg-background pl-4 pr-12 text-xs focus:outline-none focus:ring-1 focus:ring-green-600"
          />

          <button
            type="submit"
            aria-label="Send comment"
            className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-green-600 transition hover:bg-muted hover:text-green-700"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {comments.map((comm) => (
          <div
            key={comm.id}
            className="flex gap-3 text-xs leading-normal"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-muted font-bold text-muted-foreground">
              {comm.avatar}
            </span>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">
                  {comm.author}
                </span>

                <span className="text-[10px] text-muted-foreground/80">
                  {comm.time}
                </span>
              </div>

              <p className="mt-1.5 rounded-2xl border border-border/40 bg-muted/15 p-3.5 leading-relaxed text-muted-foreground">
                {comm.content}
              </p>

              <div className="mt-2 flex items-center gap-4 pl-1">
                <button
                  type="button"
                  onClick={() =>
                    toggleLike(comm.id)
                  }
                  className={`flex items-center gap-1 text-[10px] font-semibold transition ${comm.isLiked
                    ? "text-green-600"
                    : "text-muted-foreground hover:text-green-600"
                    }`}
                >
                  <ThumbsUp
                    className={`h-3.5 w-3.5 ${comm.isLiked
                      ? "fill-green-600/20"
                      : ""
                      }`}
                  />

                  <span>
                    {comm.likes} Upvote
                    {comm.likes !== 1
                      ? "s"
                      : ""}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}