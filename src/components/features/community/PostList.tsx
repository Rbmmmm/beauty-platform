import React from 'react';
import { Post } from '@/types/post';
import PostCard from './PostCard';

const PostList: React.FC<{ posts: Post[] }> = ({ posts }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {posts.map((post) => (
      <PostCard key={post.id} post={post} />
    ))}
  </div>
);

export default PostList; 