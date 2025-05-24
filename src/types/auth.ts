export interface User {
  id: number;
  username: string;
  nickname: string;
  avatar: string | null;
  bio: string | null;
  phone: string | null;
  date_joined: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  password2: string;
  nickname: string;
  phone: string;
}

export interface AuthResponse {
  user: User;
  access: string;
  refresh: string;
}

export interface TokenRefreshData {
  refresh: string;
} 