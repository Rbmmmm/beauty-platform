import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/community/', // 指向 Django 后端
  timeout: 10000,
  withCredentials: true,
});

// 请求拦截器，自动加token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('beauty_token');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器（可根据需要自定义）
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 可在此处理全局错误
    return Promise.reject(error);
  }
);