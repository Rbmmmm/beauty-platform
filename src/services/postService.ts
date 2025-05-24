import { apiClient } from '@/utils/apiClient';
import { Post, PostCreateData, PostUpdateData, Comment, CategoryPostsResponse } from '@/types/post';
import axios from 'axios';

export const postService = {
  // 获取帖子列表
  getPosts: async (params?: { category?: string; tag?: string; page?: number; limit?: number }) => {
    try {
      const response = await apiClient.get<{ results: Post[]; count: number }>('/community/posts/', { params });
      console.log('获取帖子列表响应:', {
        data: response.data,
        samplePost: response.data.results?.[0],
        createdAt: response.data.results?.[0]?.created_at,
      });
      return response.data.results; // 直接返回帖子数组
    } catch (error) {
      console.error('获取帖子列表失败:', error);
      if (axios.isAxiosError(error)) {
        console.error('API错误详情:', {
          status: error.response?.status,
          data: error.response?.data,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            params: error.config?.params
          }
        });
      }
      throw error;
    }
  },

  // 获取帖子详情
  getPost: async (postId: string) => {
    const response = await apiClient.get<Post>(`/community/posts/${postId}/`);
    return response.data;
  },

  // 创建帖子
  createPost: async (data: PostCreateData) => {
    try {
      if (!data.content || data.content.trim() === '') {
        throw new Error('帖子内容不能为空');
      }

      const formData = new FormData();
      formData.append('content', data.content.trim());
      
      if (data.images && data.images.length > 0) {
        data.images.forEach((image: File) => {
          formData.append('images', image);
        });
      }
      
      if (data.category) {
        formData.append('category', data.category.toString());
      }

      console.log('发送帖子数据:', {
        content: data.content,
        category: data.category,
        imagesCount: data.images?.length || 0,
        formDataEntries: Array.from(formData.entries()).map(([key, value]) => ({
          key,
          value: value instanceof File ? `File: ${value.name}` : value
        }))
      });

      const response = await apiClient.post<Post>('/community/posts/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('发帖成功:', response.data);
      return response.data;
    } catch (error) {
      console.error('发帖失败:', error);
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data;
        console.error('API错误详情:', {
          status: error.response?.status,
          data: errorData,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            headers: error.config?.headers,
          }
        });
        
        // 尝试提取具体的错误信息
        if (typeof errorData === 'object' && errorData !== null) {
          const errorMessage = Object.entries(errorData)
            .map(([key, value]) => `${key}: ${value}`)
            .join('; ');
          throw new Error(errorMessage);
        }
      }
      throw error;
    }
  },

  // 更新帖子
  updatePost: async (postId: string, data: PostUpdateData) => {
    const formData = new FormData();
    if (data.content) {
      formData.append('content', data.content);
    }
    if (data.images) {
      data.images.forEach((image: File) => formData.append('images', image));
    }
    if (data.category) {
      formData.append('category', data.category.toString());
    }
    if (data.tags) {
      formData.append('tags', JSON.stringify(data.tags));
    }

    const response = await apiClient.put<Post>(`/community/posts/${postId}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // 删除帖子
  deletePost: async (postId: string) => {
    await apiClient.delete(`/community/posts/${postId}/`);
  },

  // 点赞帖子
  likePost: async (postId: string) => {
    const response = await apiClient.post<Post>(`/community/posts/${postId}/like/`);
    return response.data;
  },

  // 取消点赞
  unlikePost: async (postId: string) => {
    const response = await apiClient.delete<Post>(`/community/posts/${postId}/like/`);
    return response.data;
  },

  // 收藏帖子
  collectPost: async (postId: string) => {
    const response = await apiClient.post<Post>(`/community/posts/${postId}/collect/`);
    return response.data;
  },

  // 取消收藏
  uncollectPost: async (postId: string) => {
    const response = await apiClient.delete<Post>(`/community/posts/${postId}/collect/`);
    return response.data;
  },

  // 获取帖子评论
  getComments: async (postId: string, params?: { page?: number; limit?: number }) => {
    const response = await apiClient.get<Comment[]>(`/community/posts/${postId}/comments/`, { params });
    return response.data;
  },

  // 发表评论
  createComment: async (postId: string, content: string, parentId?: string) => {
    const response = await apiClient.post<Comment>(`/community/posts/${postId}/comments/`, {
      content,
      ...(parentId ? { parent: parentId } : {})
    });
    return response.data;
  },

  // 删除评论
  deleteComment: async (postId: string, commentId: string) => {
    await apiClient.delete(`/community/posts/${postId}/comments/${commentId}/`);
  },

  getCategoryPosts: async (categoryId: string, page: number = 1, pageSize: number = 10): Promise<CategoryPostsResponse> => {
    const response = await apiClient.get(`/community/categories/${categoryId}/posts/`, {
      params: { page, pageSize }
    });
    return response.data;
  },
}; 