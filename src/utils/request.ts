import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ERROR_MESSAGES } from '@/constants';
import env from '@/config/env';

// 创建 axios 实例
const request = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem('beauty_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;
    // 这里可以根据后端的响应结构进行调整
    if (data.code === 0) {
      return data.data;
    }
    // 处理业务错误
    return Promise.reject(new Error(data.message || ERROR_MESSAGES.SERVER_ERROR));
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;
      switch (status) {
        case 401:
          // 处理未授权
          window.location.href = '/login';
          return Promise.reject(new Error(ERROR_MESSAGES.UNAUTHORIZED));
        case 403:
          return Promise.reject(new Error(ERROR_MESSAGES.FORBIDDEN));
        case 500:
          return Promise.reject(new Error(ERROR_MESSAGES.SERVER_ERROR));
        default:
          return Promise.reject(new Error(error.message || ERROR_MESSAGES.NETWORK_ERROR));
      }
    }
    return Promise.reject(new Error(ERROR_MESSAGES.NETWORK_ERROR));
  }
);

// 封装 GET 请求
export const get = <T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> => {
  return request.get(url, { params, ...config });
};

// 封装 POST 请求
export const post = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return request.post(url, data, config);
};

// 封装 PUT 请求
export const put = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return request.put(url, data, config);
};

// 封装 DELETE 请求
export const del = <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return request.delete(url, config);
};

export default request; 