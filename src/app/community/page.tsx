"use client";

import React, { useState, useEffect } from 'react';
import PostList from '@/components/features/community/PostList';
import CreatePostForm from '@/components/features/community/CreatePostForm';
import { Post } from '@/types/post';
import { postService } from '@/services/postService';
import { App } from 'antd';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { activityService } from '@/services/activityService';
import type { Activity } from '@/types/activity';

export default function CommunityPage() {
  const { message } = App.useApp();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [activeTopic, setActiveTopic] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 10;

  // 构建顶部分类：全部 + 所有活动
  const topics = [
    { id: 'all', name: '全部' },
    ...activities.map((a) => ({ id: String(a.id), name: a.title })),
  ];

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

  // 根据 URL 参数和活动加载设置初始 activeTopic
  useEffect(() => {
    if (activities.length > 0) { // 确保活动列表已加载
      const activityIdFromUrl = searchParams.get('activityId');
      const topicExists = topics.some(topic => topic.id === activityIdFromUrl);

      if (activityIdFromUrl && topicExists) {
          setActiveTopic(activityIdFromUrl); // 设置 activeTopic 为 URL 中的活动 ID
      } else {
          setActiveTopic('all'); // 如果 URL 中没有 activityId 参数、参数无效或活动未加载完成，则默认为全部
      }
    } else { // 如果活动列表还没有加载，但 URL 中有参数，先设置为参数值，等活动加载完再验证
       const activityIdFromUrl = searchParams.get('activityId');
       if(activityIdFromUrl) {
           setActiveTopic(activityIdFromUrl); // 暂时设置为 URL 中的 ID
       }
    }
  }, [activities, searchParams, topics.length]); // 依赖 activities 和 searchParams

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

  // 当 activeTopic 或 page 改变时获取帖子
  useEffect(() => {
    // 在 activities 加载并且 topics 构建完成，或者 activeTopic 是 'all' 时才 fetch posts
    if (activeTopic === 'all' || activities.length > 0) {
        setPage(1); // activeTopic 改变时重置页码
        fetchPosts(true); // 强制刷新
    }
  }, [activeTopic, activities.length]); // 依赖 activeTopic 和 activities.length
  
  useEffect(() => {
    if (page > 1 && (activeTopic === 'all' || activities.length > 0)) {
      fetchPosts();
    }
  }, [page, activeTopic, activities.length]);

  // 监听路由变化，回到社区主页时根据URL参数刷新 (简化)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        // 当页面可见时，如果当前 activeTopic 不是根据 URL 设置的，或者 URL 参数改变了，则重新同步
        const activityIdFromUrl = searchParams.get('activityId');
        const currentActiveTopicIsFromUrl = activeTopic === activityIdFromUrl;

        if (!currentActiveTopicIsFromUrl) { // 如果当前的 activeTopic 不是来自 URL
            const topicExists = topics.some(topic => topic.id === activityIdFromUrl);
            if (activityIdFromUrl && topicExists) {
                setActiveTopic(activityIdFromUrl);
            } else {
                setActiveTopic('all');
            }
             // 刷新帖子会在 activeTopic 改变时由上面的 useEffect 触发
        } else if (activeTopic === 'all' && activityIdFromUrl) { // 如果当前是all，但URL有指定活动
             const topicExists = topics.some(topic => topic.id === activityIdFromUrl);
             if (topicExists) {
                 setActiveTopic(activityIdFromUrl);
             }
        }
         // 如果 activeTopic 没变，但帖子列表可能过期，可以考虑手动fetch一次
         // fetchPosts(true); // 如果需要强制刷新所有情况，取消注释
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [searchParams, activeTopic, topics]); // 依赖 searchParams, activeTopic 和 topics

  const handleTopicChange = (topicId: string) => {
    setActiveTopic(topicId);
    // 可选：更新 URL 以反映当前选中的分类，但这会影响浏览器历史记录
    // router.push(`/community${topicId === 'all' ? '' : `?activityId=${topicId}`}`);
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