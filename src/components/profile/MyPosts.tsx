'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Post } from '@/types/post';
import { formatDate } from '@/utils/format';
import Image from 'next/image';
import Link from 'next/link';

export default function MyPosts() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchPosts = async (pageNum: number = 1) => {
    try {
      const response = await fetch(`http://localhost:8000/api/community/posts/my_posts/?page=${pageNum}`, {
        headers: {
          'Authorization': accessToken ? `Bearer ${accessToken}` : '',
        },
      });
      
      if (!response.ok) {
        throw new Error('获取帖子失败');
      }
      
      const data = await response.json();
      if (Array.isArray(data)) {
        if (pageNum === 1) {
          setPosts(data);
        } else {
          setPosts(prev => [...prev, ...data]);
        }
        setHasMore(false);
      } else {
        if (pageNum === 1) {
          setPosts(data.results || []);
        } else {
          setPosts(prev => [...prev, ...(data.results || [])]);
        }
        setHasMore(!!data.next);
      }
    } catch (error) {
      console.error('获取帖子失败:', error);
      setError('获取帖子失败，请稍后重试');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchPosts();
    }
  }, [accessToken]);

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      setPage(prev => prev + 1);
      fetchPosts(page + 1);
    }
  };

  const handleDelete = async (postId: number) => {
    if (!confirm('确定要删除这篇帖子吗？')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/community/posts/${postId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': accessToken ? `Bearer ${accessToken}` : '',
        },
      });

      if (!response.ok) {
        throw new Error('删除帖子失败');
      }

      setPosts(prev => prev.filter(post => post.id !== postId));
    } catch (error) {
      console.error('删除帖子失败:', error);
      alert('删除帖子失败，请稍后重试');
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-20 bg-gray-200 rounded mb-4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => fetchPosts(1)}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          重试
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">您还没有发布过帖子</p>
        <Link
          href="/community/create"
          className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          发布新帖子
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">我的帖子</h2>
        <Link
          href="/community/create"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          发布新帖子
        </Link>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500">{formatDate(post.created_at)}</p>
              </div>
              <div className="flex space-x-2">
                <Link
                  href={`/community/posts/${post.id}/edit`}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  编辑
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  删除
                </button>
              </div>
            </div>

            <p className="text-gray-800 mb-4">{post.content}</p>

            {post.images && post.images.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mb-4">
                {post.images.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={image.startsWith('http') ? image : `http://localhost:8000${image}`}
                      alt={`帖子图片 ${index + 1}`}
                      className="object-cover rounded-lg w-full h-full"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <span>👍 {post.likes_count} 点赞</span>
              <span>💬 {post.comments_count} 评论</span>
              <span>⭐ {post.collections_count} 收藏</span>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50"
          >
            {loadingMore ? '加载中...' : '加载更多'}
          </button>
        </div>
      )}
    </div>
  );
} 