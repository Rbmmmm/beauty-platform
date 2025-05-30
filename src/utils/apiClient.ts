import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const apiClient = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.error('API错误:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data
    });

    if (error.code === 'ECONNABORTED') {
      console.error('请求超时');
      return Promise.reject({
        message: '请求超时，请稍后重试',
        originalError: error
      });
    }

    if (error.response?.status === 401) {
      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        if (refreshToken) {
          const response = await axios.post(`${baseURL}/auth/token/refresh/`, {
            refresh: refreshToken
          });
          const { access } = response.data;
          useAuthStore.getState().setAccessToken(access);
          
          // 重试原始请求
          error.config.headers.Authorization = `Bearer ${access}`;
          return apiClient(error.config);
        }
      } catch (refreshError) {
        console.error('刷新token失败:', refreshError);
        useAuthStore.getState().logout();
      }
    }

    return Promise.reject(error);
  }
); 