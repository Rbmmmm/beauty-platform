export interface User {
  id: string;
  username: string;
  avatar?: string;
  email?: string;
  created_at: string;
  updated_at: string;
}

// 用户信息接口
export interface UserInfo {
  id: string;
  nickname: string;
  avatar: string;
  age: number;
  gender: 'male' | 'female';
  phone: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
}

// 用户设置接口
export interface UserSettings {
  theme: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
  notification: boolean;
  language: 'zh-CN' | 'en-US';
}

// 用户统计数据接口
export interface UserStats {
  courseCount: number;
  favoriteCount: number;
  shareCount: number;
  skinAnalysisCount: number;
  lastAnalysisDate?: string;
}

// 用户积分记录接口
export interface PointsRecord {
  id: string;
  type: 'earn' | 'spend';
  points: number;
  description: string;
  createdAt: string;
}

// 用户课程记录接口
export interface CourseRecord {
  id: string;
  courseId: string;
  courseName: string;
  progress: number;
  lastStudyTime: string;
  isCompleted: boolean;
} 