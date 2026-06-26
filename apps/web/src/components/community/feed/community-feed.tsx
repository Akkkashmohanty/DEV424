import { posts } from "@/features/community/mock/community.mock"

import PostCard from "../posts/post-card"

export default function CommunityFeed() {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}
    </div>
  )
}