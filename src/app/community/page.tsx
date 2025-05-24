"use client";

import React from 'react';
import { useState, useEffect } from 'react';
import PostList from '@/components/features/community/PostList';
import CreatePostForm from '@/components/features/community/CreatePostForm';
import { Post } from '@/types/post';
import { postService } from '@/services/postService';
import { App } from 'antd';
import { useRouter } from 'next/navigation';

const topics = [
  { id: 'all', name: '全部' },
  { id: 'makeup', name: '妆容分享' },
  { id: 'skincare', name: '护肤心得' },
  { id: 'products', name: '好物推荐' },
  { id: 'tips', name: '美妆技巧' },
];

export default function CommunityPage() {
  const { message } = App.useApp();
  const router = useRouter();
  const [activeTopic, setActiveTopic] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  // 获取帖子列表
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params = activeTopic === 'all' ? undefined : { category: activeTopic };
      const response = await postService.getPosts(params);
      if (Array.isArray(response)) {
        setPosts(response);
      } else if (response && typeof response === 'object' && 'results' in response) {
        setPosts(response.results);
      } else {
        console.error('意外的响应格式:', response);
        setPosts([]);
      }
    } catch (error) {
      console.error('获取帖子失败:', error);
      message.error('获取帖子失败');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [activeTopic]);

  // 监听路由变化，回到社区主页时自动刷新
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        fetchPosts();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  const handleTopicChange = (topicId: string) => {
    setActiveTopic(topicId);
  };

  const handleCreatePost = async (data: { content: string; images: File[] }) => {
    try {
      const result = await postService.createPost({
        content: data.content,
        images: data.images,
        category: activeTopic !== 'all' ? activeTopic : undefined
      });
      message.success('发布成功');
      setShowCreateForm(false);
      fetchPosts();
      return true;
    } catch (error) {
      if (error instanceof Error) {
        message.error(`发布失败: ${error.message}`);
      } else {
        message.error('发布失败，请重试');
      }
      return false;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 话题导航 */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => handleTopicChange(topic.id)}
            className={`px-6 py-2 text-lg rounded-full whitespace-nowrap transition-colors ${
              activeTopic === topic.id
                ? 'bg-[#FF6B81] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {topic.name}
          </button>
        ))}
      </div>

      {/* 发帖按钮 */}
      <div className="mb-8">
        <button
          onClick={() => setShowCreateForm(true)}
          className="w-full py-4 text-xl text-white bg-[#FF6B81] rounded-[28px] hover:bg-[#FF4D6D] transition-colors"
        >
          分享你的美妆心得
        </button>
      </div>

      {/* 发帖表单 */}
      {showCreateForm && (
        <div className="mb-8">
          <CreatePostForm
            onSubmit={handleCreatePost}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      )}

      {/* 帖子列表 */}
      {loading ? (
        <div className="text-center py-8 text-gray-500">加载中...</div>
      ) : posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <div className="text-center py-8 text-gray-500">
          暂无帖子，快来发布第一条吧！
        </div>
      )}
    </div>
  );
} 