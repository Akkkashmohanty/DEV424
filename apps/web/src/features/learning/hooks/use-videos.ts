"use client"

import { useQuery } from "@tanstack/react-query"
import { videoApi } from "../api/video.api"

export function useVideos() {
  return useQuery({
    queryKey: ["videos"],
    queryFn: videoApi.getVideos,
  })
}

export function useVideo(videoId: string) {
  return useQuery({
    queryKey: ["video", videoId],
    queryFn: () => videoApi.getVideo(videoId),
  })
}