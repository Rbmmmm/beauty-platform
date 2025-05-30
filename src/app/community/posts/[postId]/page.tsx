'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Post } from '@/types/post';
import { postService } from '@/services/postService';
import { CommentList } from '@/components/features/community/CommentList';
import { HeartOutlined, HeartFilled, StarOutlined, StarFilled, RobotOutlined } from '@ant-design/icons';
import { message, Spin, App } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { apiClient } from '@/utils/apiClient';

console.log('CommentList:', CommentList);

const PostDetailPage = () => {
  const { message: messageApi } = App.useApp();
  const params = useParams();
  const postId = params.postId as string;
  console.log('PostDetailPage postId:', postId);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [isGeneratingReply, setIsGeneratingReply] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '') || 'http://localhost:8000';

  // 加载帖子详情
  const loadPost = async () => {
    try {
      setLoading(true);
      const data = await postService.getPost(postId);
      setPost(data);
    } catch (error) {
      messageApi.error('加载帖子失败');
    } finally {
      setLoading(false);
    }
  };

  // 点赞/取消点赞
  const handleLike = async () => {
    if (!post) return;
    try {
      await postService.likePost(postId);
      loadPost();
    } catch (error) {
      messageApi.error('操作失败');
    }
  };

  // 收藏/取消收藏
  const handleCollect = async () => {
    if (!post) return;
    try {
      await postService.collectPost(postId);
      loadPost();
    } catch (error) {
      messageApi.error('操作失败');
    }
  };

  // AI自动回复
  const handleAIAutoReply = async () => {
    if (!post) return;
    try {
      setIsGeneratingReply(true);
      console.log('开始生成AI回复...');
      
      const response = await apiClient.post(`/community/posts/${postId}/ai_reply/`);
      console.log('AI回复响应:', response);
      
      if (response.data.status === 'success') {
        messageApi.success('AI回复已添加');
        await loadPost(); // 等待加载完成
      } else {
        const errorMsg = response.data.error || '生成回复失败';
        console.error('AI回复失败:', errorMsg);
        messageApi.error(errorMsg);
      }
    } catch (error: any) {
      console.error('AI回复错误详情:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      
      let errorMessage = '生成回复失败，请稍后重试';
      if (error.message === 'timeout of 30000ms exceeded') {
        errorMessage = '生成回复时间较长，请稍后查看结果';
        // 即使超时也尝试刷新帖子，因为后端可能已经成功处理了请求
        await loadPost();
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = `请求失败: ${error.message}`;
      }
      
      messageApi.error(errorMessage);
    } finally {
      setIsGeneratingReply(false);
    }
  };

  useEffect(() => {
    loadPost();
  }, [postId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">帖子不存在或已被删除</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* 返回主页按钮 */}
      <div className="mb-4">
        <Link href="/community">
          <button className="flex items-center gap-2 text-lg text-[#FF6B81] bg-[#FFF0F3] px-4 py-2 rounded-full shadow hover:bg-[#FFD6DE] transition-colors">
            <svg width="24" height="24" fill="none" stroke="#FF6B81" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><path d="M15 18l-6-6 6-6"/></svg>
            返回社区主页
          </button>
        </Link>
      </div>

      {/* 帖子内容 */}
      <div className="bg-white rounded-2xl p-6 space-y-4">
        {/* 作者信息 */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-[#FFE5E5] flex items-center justify-center">
            {post.author.avatar ? (
              <Image
                src={post.author.avatar}
                alt={post.author.username}
                width={48}
                height={48}
                className="object-cover"
              />
            ) : (
              <span className="text-[#FF6B81] text-2xl font-bold">
                {post.author.username[0].toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg">{post.author.username}</h3>
            <p className="text-gray-500 text-sm">{post.created_at}</p>
          </div>
        </div>

        {/* 帖子内容 */}
        <div className="text-lg">{post.content}</div>

        {/* 活动信息 */}
        {post.activity && (
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[#FF6B81] font-bold text-base bg-[#FFF0F3] px-3 py-1 rounded-full">
              活动：{post.activity.title}
            </span>
          </div>
        )}

        {/* 标签信息 */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {post.tags.map(tag => (
              <span
                key={tag.id}
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  background: tag.color || '#FFE5E5',
                  color: '#fff',
                }}
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        {/* 帖子图片 */}
        {post.images && post.images.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {post.images.map((image, index) => {
              const imgUrl = image.startsWith('http') ? image : `${backendUrl}${image}`;
              return (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                  <Image
                    src={imgUrl}
                    alt={`帖子图片 ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* 帖子操作 */}
        <div className="flex items-center gap-6 pt-4">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 text-gray-500 hover:text-[#FF6B81]"
          >
            {post.is_liked ? (
              <HeartFilled className="text-[#FF6B81]" />
            ) : (
              <HeartOutlined />
            )}
            <span>{post.likes_count} 点赞</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-gray-500 hover:text-[#FF6B81]"
          >
            <span>{post.comments_count} 评论</span>
          </button>
          <button
            onClick={handleCollect}
            className="flex items-center gap-2 text-gray-500 hover:text-[#FF6B81]"
          >
            {post.is_collected ? (
              <StarFilled className="text-[#FF6B81]" />
            ) : (
              <StarOutlined />
            )}
            <span>收藏</span>
          </button>
          <button
            onClick={handleAIAutoReply}
            disabled={isGeneratingReply}
            className="flex items-center gap-2 text-gray-500 hover:text-[#FF6B81] disabled:opacity-50"
          >
            <RobotOutlined />
            <span>{isGeneratingReply ? '生成中...' : 'AI回复'}</span>
          </button>
        </div>
      </div>

      {/* 评论区 */}
      {showComments && (
        <div className="bg-white rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4">评论 ({post.comments_count})</h3>
          <CommentList
            postId={postId}
            onCommentChange={loadPost}
          />
        </div>
      )}
    </div>
  );
};

export default PostDetailPage; 