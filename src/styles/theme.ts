import type { ThemeConfig } from 'antd';

export const colors = {
  primary: '#FF6B81', // 温柔的玫瑰粉，体现优雅和温暖
  secondary: '#FFC3A0', // 柔和的珊瑚色
  accent: '#A8E6CF', // 清新的薄荷绿
  background: {
    light: '#FFFFFF',
    subtle: '#F8F9FA',
    muted: '#F3F4F6',
  },
  text: {
    primary: '#1F2937',
    secondary: '#4B5563',
    muted: '#6B7280',
  },
  border: {
    light: '#E5E7EB',
    default: '#D1D5DB',
  },
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};

export const spacing = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
};

export const typography = {
  fontFamily: {
    sans: '"PingFang SC", "Microsoft YaHei", -apple-system, system-ui, sans-serif',
  },
  fontSize: {
    h1: '2.5rem',    // 40px
    h2: '2rem',      // 32px
    h3: '1.75rem',   // 28px
    h4: '1.5rem',    // 24px
    body: '1.125rem', // 18px
    small: '1rem',    // 16px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
};

export const transitions = {
  default: 'all 0.3s ease',
  smooth: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
};

// Ant Design 主题配置
export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: colors.primary,
    colorSuccess: colors.success,
    colorWarning: colors.warning,
    colorError: colors.error,
    colorTextBase: colors.text.primary,
    fontFamily: typography.fontFamily.sans,
    borderRadius: 12,
    wireframe: false,
  },
  components: {
    Button: {
      borderRadius: 8,
      controlHeight: 44,
      fontSize: 16,
    },
    Card: {
      borderRadius: 16,
    },
    Modal: {
      borderRadius: 16,
    },
  },
}; 