'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Post } from '@/types/post';
import { postService } from '@/services/postService';
import { message } from 'antd';

export default function EditPostPage({ params }: { params: { postId: string } }) {
  const router = useRouter();
  const { token } = useAuthStore();
  const [post, setPost] = useState<Post | null>(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postService.getPost(params.postId);
        setPost(data);
        setContent(data.content);
      } catch (error) {
        message.error('获取帖子失败');
        router.push('/community');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPost();
    }
  }, [params.postId, token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      message.error('帖子内容不能为空');
      return;
    }

    setSubmitting(true);
    try {
      await postService.updatePost(params.postId, { content });
      message.success('更新成功');
      router.push(`/community/posts/${params.postId}`);
    } catch (error) {
      message.error('更新失败');
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
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">编辑帖子</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-32 p-4 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="写下您的想法..."
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                取消
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                {submitting ? '保存中...' : '保存'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 