import {
  Post,
  Challenge,
  LeaderboardUser,
} from "../types/community.types"

export const posts: Post[] = [
  {
    id: "1",
    author: "Akash Kumar",
    content: "Harvested fresh tomatoes today 🌱",
    image:
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735",
    likes: 125,
    comments: 18,
  },

  {
    id: "2",
    author: "Priya Sharma",
    content:
      "My balcony spinach is ready for harvest 🥬",
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
    likes: 98,
    comments: 12,
  },

  {
    id: "3",
    author: "Rahul Verma",
    content:
      "Started a hydroponics setup this week. Excited for the results 🚀",
    image:
      "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8",
    likes: 210,
    comments: 35,
  },
]

export const challenges: Challenge[] = [
  {
    id: "1",
    title: "30 Day Balcony Farming Challenge",
    participants: 1450,
  },

  {
    id: "2",
    title: "Grow Your First Tomato Plant",
    participants: 980,
  },

  {
    id: "3",
    title: "Water Saving Farming Challenge",
    participants: 620,
  },
]

export const leaderboard: LeaderboardUser[] = [
  {
    id: "1",
    name: "Akash Kumar",
    points: 1240,
  },

  {
    id: "2",
    name: "Priya Sharma",
    points: 1180,
  },

  {
    id: "3",
    name: "Rahul Verma",
    points: 1095,
  },

  {
    id: "4",
    name: "Ananya Das",
    points: 980,
  },

  {
    id: "5",
    name: "Rohit Singh",
    points: 870,
  },
]