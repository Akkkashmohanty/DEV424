import { videos } from "../mock/videos.mock"

export const videoApi = {
  async getVideos() {
    return Promise.resolve(videos)
  },

  async getVideo(videoId: string) {
    return Promise.resolve(
      videos.find((video) => video.id === videoId),
    )
  },
}