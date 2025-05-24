import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';
import type { LoginData, RegisterData } from '@/types/auth';

export const useAuth = () => {
  const router = useRouter();
  const { setAuth, clearAuth, updateUser } = useAuthStore();

  const login = useCallback(async (data: LoginData) => {
    try {
      const response = await authService.login(data);
      setAuth(response.user, response.access, response.refresh);
      router.push('/community');
      return response;
    } catch (error) {
      console.error('登录失败:', error);
      throw error;
    }
  }, [router, setAuth]);

  const register = useCallback(async (data: RegisterData) => {
    try {
      const response = await authService.register(data);
      setAuth(response.user, response.access, response.refresh);
      router.push('/community');
      return response;
    } catch (error) {
      console.error('注册失败:', error);
      throw error;
    }
  }, [router, setAuth]);

  const logout = useCallback(() => {
    clearAuth();
    router.push('/auth/login');
  }, [router, clearAuth]);

  const updateProfile = useCallback(async (data: Partial<RegisterData>) => {
    try {
      const user = await authService.updateProfile(data);
      updateUser(user);
      return user;
    } catch (error) {
      console.error('更新个人信息失败:', error);
      throw error;
    }
  }, [updateUser]);

  return {
    login,
    register,
    logout,
    updateProfile,
  };
}; 