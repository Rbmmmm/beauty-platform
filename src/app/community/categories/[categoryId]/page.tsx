"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Spin, Empty } from 'antd';
import PostList from '@/components/features/community/PostList';
import { Category, Post, CategoryPostsResponse } from '@/types/post';
import { getCategoryPosts } from '@/services/postService';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<Category | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchCategoryPosts();
  }, [categoryId, page]);

  const fetchCategoryPosts = async () => {
    try {
      setLoading(true);
      const response = await getCategoryPosts(categoryId as string, page);
      if (page === 1) {
        setCategory(response.category);
        setPosts(response.posts);
      } else {
        setPosts(prev => [...prev, ...response.posts]);
      }
      setHasMore(response.posts.length === response.pageSize);
    } catch (error) {
      console.error('获取分类帖子失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  const handleLike = async (postId: string) => {
    // 实现点赞功能
  };

  const handleCollect = async (postId: string) => {
    // 实现收藏功能
  };

  const handleComment = async (postId: string, content: string) => {
    // 实现评论功能
  };

  const handleShare = async (postId: string) => {
    // 实现分享功能
  };

  if (loading && page === 1) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spin size="large" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Empty description="分类不存在" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
        <p className="text-lg text-gray-600">{category.description}</p>
        <div className="mt-2 text-sm text-gray-500">
          共 {category.postCount} 篇帖子
        </div>
      </div>

      <PostList
        posts={posts}
        onLike={handleLike}
        onCollect={handleCollect}
        onComment={handleComment}
        onShare={handleShare}
      />

      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-6 py-2 bg-primary-main text-white rounded-full hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {loading ? '加载中...' : '加载更多'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage; 