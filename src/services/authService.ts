import { apiClient } from '@/utils/apiClient';
import type { LoginData, RegisterData, AuthResponse, TokenRefreshData } from '@/types/auth';

export const authService = {
  // 用户注册
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/users/register/', data);
    return response.data;
  },

  // 用户登录
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/users/login/', data);
    return response.data;
  },

  // 刷新令牌
  async refreshToken(data: TokenRefreshData): Promise<{ access: string }> {
    const response = await apiClient.post<{ access: string }>('/users/token/refresh/', data);
    return response.data;
  },

  // 获取用户信息
  async getProfile() {
    const response = await apiClient.get('/users/profile/');
    return response.data;
  },

  // 更新用户信息
  async updateProfile(data: Partial<RegisterData>) {
    const response = await apiClient.patch('/users/profile/', data);
    return response.data;
  }
}; 