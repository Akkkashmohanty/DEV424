"use client"

import { useQuery } from "@tanstack/react-query"

import { communityApi } from "../api/community.api"

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: communityApi.getPosts,
  })
}

export function useChallenges() {
  return useQuery({
    queryKey: ["challenges"],
    queryFn: communityApi.getChallenges,
  })
}

export function useLeaderboard() {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: communityApi.getLeaderboard,
  })
}