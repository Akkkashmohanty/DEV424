"use client"

import Link from "next/link"
import {
  Play,
  Eye,
  ThumbsUp,
  MapPin,
  Globe,
} from "lucide-react"

import { Video } from "@/features/learning/types/video.types"

interface Props {
  video: Video
}

export default function VideoCard({ video }: Props) {
  return (
    <Link
      href={`/learn/${video.id}`}
      className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600/90 text-white shadow-md">
            <Play className="h-5 w-5 fill-white pl-0.5" />
          </span>
        </div>

        <span className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[9px] font-bold uppercase text-white backdrop-blur-md">
          {video.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h4 className="text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-green-600">
            {video.title}
          </h4>

          <div className="mt-2.5 flex items-center gap-2.5 text-[10px] font-semibold text-muted-foreground">
            <span className="flex items-center gap-0.5">
              <MapPin className="h-3 w-3 text-red-500" />
              {video.state}
            </span>

            <span>•</span>

            <span className="flex items-center gap-0.5">
              <Globe className="h-3 w-3 text-blue-500" />
              {video.language}
            </span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-3.5">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border bg-green-600/10 text-[10px] font-bold text-green-700">
              {video.creator.charAt(0)}
            </span>

            <span className="text-[10px] font-semibold leading-none text-foreground/80">
              {video.creator}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[9px] text-muted-foreground">
            <span className="flex items-center gap-0.5">
              <Eye className="h-3 w-3" />
              {(video.views / 1000).toFixed(0)}k
            </span>

            <span className="flex items-center gap-0.5">
              <ThumbsUp className="h-3 w-3" />
              {video.likes}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}