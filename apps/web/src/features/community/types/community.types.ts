export interface Post {
  id: string
  author: string
  content: string
  image?: string
  likes: number
  comments: number
}

export interface Challenge {
  id: string
  title: string
  participants: number
}

export interface LeaderboardUser {
  id: string
  name: string
  points: number
}