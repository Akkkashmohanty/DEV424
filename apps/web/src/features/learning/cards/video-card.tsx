import Image from "next/image"
import Link from "next/link"

import { Video } from "@/features/learning/types/video.types"

interface Props {
  video: Video
}

export default function VideoCard({
  video,
}: Props) {
  return (
    <Link
      href={`/learn/${video.id}`}
      className="group"
    >
      <div className="overflow-hidden rounded-3xl border bg-card">
        <div className="relative aspect-video">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-4">
          <h3 className="line-clamp-2 text-lg font-semibold">
            {video.title}
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            {video.creator}
          </p>

          <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
            <span>{video.views} views</span>

            <span>{video.createdAt}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}