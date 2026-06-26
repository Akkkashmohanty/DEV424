import { create } from "zustand"
import { Video } from "../types/video.types"

interface VideoState {
  bookmarks: Video[]
  addBookmark: (video: Video) => void
}

export const useVideoStore = create<VideoState>((set) => ({
  bookmarks: [],

  addBookmark: (video) =>
    set((state) => ({
      bookmarks: [...state.bookmarks, video],
    })),
}))