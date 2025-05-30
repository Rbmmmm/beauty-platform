import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  transformRequest: [
    (data, headers) => {
      // 如果是 FormData 或 Blob，直接返回
      if (data instanceof FormData || data instanceof Blob) {
        return data;
      }
      // 确保数据被正确序列化为 JSON 字符串
      if (data && typeof data === 'object') {
        return JSON.stringify(data);
      }
      return data;
    },
  ],
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    
    // 打印请求信息
    console.log('API请求:', {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers
    });
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error('请求拦截器错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    // 打印响应信息
    console.log('API响应:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    console.error('API错误:', {
      url: originalRequest?.url,
      method: originalRequest?.method,
      status: error.response?.status,
      data: error.response?.data
    });

    // 如果是 401 错误且不是刷新令牌的请求
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { refreshToken, setAuth } = useAuthStore.getState();
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        // 尝试刷新令牌
        const response = await apiClient.post('/users/token/refresh/', {
          refresh: refreshToken,
        });

        const { access } = response.data;
        const { user } = useAuthStore.getState();

        // 更新状态
        if (user) {
          setAuth(user, access, refreshToken);
        }

        // 重试原始请求
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // 刷新令牌失败，清除认证状态
        useAuthStore.getState().clearAuth();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
); 