import { videos } from "@/features/learning/mock/videos.mock"

import VideoPlayer from "@/components/learning/player/video-player"
import VideoActions from "@/components/learning/player/video-actions"
import CommentsSection from "@/components/learning/comments/comments-section"
import VideoCard from "@/components/learning/cards/video-card"

interface Props {
  params: Promise<{
    videoId: string
  }>
}

export default async function VideoPage({
  params,
}: Props) {
  const { videoId } = await params

  const video = videos.find(
    (item) => item.id === videoId,
  )

  if (!video) {
    return null
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <VideoPlayer url={video.videoUrl} />

          <h1 className="mt-6 text-3xl font-bold">
            {video.title}
          </h1>

          <VideoActions />

          <div className="mt-10">
            <CommentsSection />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">
            Recommended Videos
          </h3>

          {videos.map((item) => (
            <VideoCard
              key={item.id}
              video={item}
            />
          ))}
        </div>
      </div>
    </main>
  )
}