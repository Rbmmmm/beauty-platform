'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Post } from '@/types/post';
import { formatDate } from '@/utils/format';
import Image from 'next/image';
import Link from 'next/link';

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { token, user } = useAuthStore();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/community/posts/${params.id}/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('获取帖子失败');
        }
        
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('获取帖子失败:', error);
        setError('获取帖子失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPost();
    }
  }, [params.id, token]);

  const handleLike = async () => {
    if (!post) return;

    try {
      const response = await fetch(`/api/community/posts/${post.id}/like/`, {
        method: post.is_liked ? 'DELETE' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('操作失败');
      }

      setPost(prev => {
        if (!prev) return null;
        return {
          ...prev,
          is_liked: !prev.is_liked,
          likes_count: prev.is_liked ? prev.likes_count - 1 : prev.likes_count + 1,
        };
      });
    } catch (error) {
      console.error('操作失败:', error);
      alert('操作失败，请稍后重试');
    }
  };

  const handleCollect = async () => {
    if (!post) return;

    try {
      const response = await fetch(`/api/community/posts/${post.id}/collect/`, {
        method: post.is_collected ? 'DELETE' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('操作失败');
      }

      setPost(prev => {
        if (!prev) return null;
        return {
          ...prev,
          is_collected: !prev.is_collected,
          collections_count: prev.is_collected ? prev.collections_count - 1 : prev.collections_count + 1,
        };
      });
    } catch (error) {
      console.error('操作失败:', error);
      alert('操作失败，请稍后重试');
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !post) return;

    setSubmitting(true);
    try {
      const response = await fetch(`/api/community/posts/${post.id}/comments/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: comment }),
      });

      if (!response.ok) {
        throw new Error('评论失败');
      }

      const newComment = await response.json();
      setPost(prev => {
        if (!prev) return null;
        return {
          ...prev,
          comments: [...(prev.comments || []), newComment],
          comments_count: prev.comments_count + 1,
        };
      });
      setComment('');
    } catch (error) {
      console.error('评论失败:', error);
      alert('评论失败，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-32 bg-gray-200 rounded mb-8"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">帖子不存在</h2>
            <p className="mt-2 text-gray-600">您要查看的帖子不存在或已被删除</p>
            <button
              onClick={() => router.push('/community')}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              返回社区
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">帖子详情</h1>
              <p className="text-sm text-gray-500 mt-1">
                发布于 {formatDate(post.created_at)}
              </p>
            </div>
            {user?.id === post.author.id && (
              <div className="flex space-x-2">
                <Link
                  href={`/community/posts/${post.id}/edit`}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  编辑
                </Link>
                <button
                  onClick={() => {
                    if (confirm('确定要删除这篇帖子吗？')) {
                      // 处理删除逻辑
                    }
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  删除
                </button>
              </div>
            )}
          </div>

          <div className="prose max-w-none mb-8">
            <p className="text-gray-800">{post.content}</p>
          </div>

          {post.images && post.images.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-8">
              {post.images.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={image}
                    alt={`帖子图片 ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center space-x-6 mb-8">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 ${
                post.is_liked ? 'text-red-600' : 'text-gray-500'
              }`}
            >
              <span>👍</span>
              <span>{post.likes_count}</span>
            </button>
            <button
              onClick={handleCollect}
              className={`flex items-center space-x-2 ${
                post.is_collected ? 'text-yellow-600' : 'text-gray-500'
              }`}
            >
              <span>⭐</span>
              <span>{post.collections_count}</span>
            </button>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">评论 ({post.comments_count})</h2>
            
            {user && (
              <form onSubmit={handleComment} className="mb-8">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="写下您的评论..."
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  rows={3}
                />
                <div className="mt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting || !comment.trim()}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {submitting ? '发送中...' : '发送评论'}
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-4">
              {post.comments?.map((comment) => (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{comment.author.nickname}</span>
                      <span className="text-sm text-gray-500">
                        {formatDate(comment.created_at)}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-800">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
 