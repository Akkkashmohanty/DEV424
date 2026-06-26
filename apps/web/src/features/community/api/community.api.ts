import {
  posts,
  challenges,
  leaderboard,
} from "../mock/community.mock"

export const communityApi = {
  async getPosts() {
    return Promise.resolve(posts)
  },

  async getChallenges() {
    return Promise.resolve(challenges)
  },

  async getLeaderboard() {
    return Promise.resolve(leaderboard)
  },
}