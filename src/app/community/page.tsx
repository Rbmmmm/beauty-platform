"use client";

import React, { useState, useEffect } from 'react';
import PostList from '@/components/features/community/PostList';
import CreatePostForm from '@/components/features/community/CreatePostForm';
import { Post } from '@/types/post';
import { postService } from '@/services/postService';
import { App } from 'antd';
import { useRouter } from 'next/navigation';
import { activityService } from '@/services/activityService';
import type { Activity } from '@/types/activity';

export default function CommunityPage() {
  const { message } = App.useApp();
  const router = useRouter();
  const [activeTopic, setActiveTopic] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 10;

  // 获取活动列表
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await activityService.getActivities();
        setActivities(res.results || []);
      } catch (error) {
        message.error('获取活动列表失败');
      }
    };
    fetchActivities();
  }, []);

  // 获取帖子列表
  const fetchPosts = async (reset = false) => {
    setLoading(true);
    try {
      let params: any = { page, limit: PAGE_SIZE };
      if (activeTopic !== 'all') {
        params.activity = activeTopic;
      }
      const response = await postService.getPosts(params);
      let newPosts = Array.isArray(response) ? response : (response?.results || []);
      if (reset) {
        setPosts(newPosts);
      } else {
        setPosts(prev => [...prev, ...newPosts]);
      }
      setHasMore(newPosts.length === PAGE_SIZE);
    } catch (error) {
      console.error('获取帖子失败:', error);
      message.error('获取帖子失败');
      if (reset) setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchPosts(true);
    // eslint-disable-next-line
  }, [activeTopic]);

  useEffect(() => {
    if (page > 1) {
      fetchPosts();
    }
    // eslint-disable-next-line
  }, [page]);

  // 监听路由变化，回到社区主页时自动刷新
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        setPage(1);
        fetchPosts(true);
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

  const handleCreatePost = async (data: { content: string; images: File[]; activity?: string; tags?: number[] }) => {
    try {
      const result = await postService.createPost({
        content: data.content,
        images: data.images,
        activity: data.activity,
        tags: data.tags,
      });
      message.success('发布成功');
      setShowCreateForm(false);
      setPage(1);
      fetchPosts(true);
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

  // 构建顶部分类：全部 + 所有活动
  const topics = [
    { id: 'all', name: '全部' },
    ...activities.map((a) => ({ id: String(a.id), name: a.title })),
  ];

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
      {loading && page === 1 ? (
        <div className="text-center py-8 text-gray-500">加载中...</div>
      ) : posts.length > 0 ? (
        <>
          <PostList posts={posts} />
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={loading}
                className="px-8 py-3 bg-[#FF6B81] text-white rounded-full text-lg font-medium hover:bg-[#FF4D6D] transition-colors disabled:opacity-50"
              >
                {loading ? '加载中...' : '加载更多'}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8 text-gray-500">
          暂无帖子，快来发布第一条吧！
        </div>
      )}
    </div>
  );
} 