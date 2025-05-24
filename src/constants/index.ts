// 路由常量
export const ROUTES = {
  HOME: '/',
  COURSE: '/course',
  PROFILE: '/profile',
  SKIN_ANALYSIS: '/skin-analysis',
  COURSE_DETAIL: '/course/[id]',
} as const;

// API 路径常量
export const API_PATHS = {
  USER: '/api/user',
  SKIN: '/api/skin',
  COURSE: '/api/course',
  PRODUCT: '/api/product',
} as const;

// 本地存储键名
export const STORAGE_KEYS = {
  TOKEN: 'beauty_token',
  USER_INFO: 'beauty_user_info',
  SKIN_DATA: 'beauty_skin_data',
} as const;

// 页面标题
export const PAGE_TITLES = {
  HOME: '首页 - 银发美妆平台',
  COURSE: '美妆课堂 - 银发美妆平台',
  PROFILE: '个人中心 - 银发美妆平台',
  SKIN_ANALYSIS: '肤质检测 - 银发美妆平台',
} as const;

// 错误信息
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '网络连接失败，请检查网络设置',
  SERVER_ERROR: '服务器错误，请稍后重试',
  UNAUTHORIZED: '请先登录',
  FORBIDDEN: '没有权限访问',
} as const;

// 成功信息
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: '登录成功',
  REGISTER_SUCCESS: '注册成功',
  UPDATE_SUCCESS: '更新成功',
  DELETE_SUCCESS: '删除成功',
} as const; 