import { apiClient } from '@/utils/apiClient';
import { Comment, CreateCommentData, CommentResponse } from '@/types/comment';
import axios from 'axios';

export const commentService = {
  // 获取帖子的评论列表
  getComments: async (postId: string, page: number = 1, limit: number = 10) => {
    try {
      const response = await apiClient.get<CommentResponse>(
        `/community/posts/${postId}/comments/`,
        { params: { page, limit } }
      );
      return response.data;
    } catch (error) {
      console.error('获取评论列表失败:', error);
      throw error;
    }
  },

  // 创建评论
  createComment: async (postId: string, content: string, parentId?: string) => {
    try {
      // 确保content是字符串
      if (typeof content !== 'string') {
        throw new Error('评论内容必须是字符串');
      }

      // 构造请求数据
      const requestData = {
        content: content.trim(),
        ...(parentId ? { parent: parentId } : {})
      };

      console.log('发送评论请求:', {
        url: `/community/posts/${postId}/comments/`,
        data: requestData
      });

      const response = await apiClient.post<Comment>(
        `/community/posts/${postId}/comments/`,
        requestData
      );
      return response.data;
    } catch (error) {
      console.error('创建评论失败:', error);
      if (axios.isAxiosError(error)) {
        console.error('API错误详情:', {
          status: error.response?.status,
          data: error.response?.data,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            data: error.config?.data
          }
        });
      }
      throw error;
    }
  },

  // 删除评论
  deleteComment: async (postId: string, commentId: string) => {
    try {
      await apiClient.delete(`/community/posts/${postId}/comments/${commentId}/`);
    } catch (error) {
      console.error('删除评论失败:', error);
      throw error;
    }
  },

  // 点赞评论
  likeComment: async (postId: string, commentId: string) => {
    try {
      const response = await apiClient.post<Comment>(
        `/community/posts/${postId}/comments/${commentId}/like/`
      );
      return response.data;
    } catch (error) {
      console.error('点赞评论失败:', error);
      throw error;
    }
  },

  // 取消点赞评论
  unlikeComment: async (postId: string, commentId: string) => {
    try {
      const response = await apiClient.post<Comment>(
        `/community/posts/${postId}/comments/${commentId}/unlike/`
      );
      return response.data;
    } catch (error) {
      console.error('取消点赞评论失败:', error);
      throw error;
    }
  },

  // 获取评论的回复列表
  getReplies: async (postId: string, commentId: string, page: number = 1, limit: number = 5) => {
    try {
      const response = await apiClient.get<CommentResponse>(
        `/community/posts/${postId}/comments/${commentId}/replies/`,
        { params: { page, limit } }
      );
      return response.data;
    } catch (error) {
      console.error('获取回复列表失败:', error);
      throw error;
    }
  },
}; 