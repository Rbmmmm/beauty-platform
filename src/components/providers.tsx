'use client';

import { ConfigProvider } from 'antd';
import RootLayout from '@/components/layout/RootLayout';

const theme = {
  token: {
    colorPrimary: '#FF6B6B',
    colorSuccess: '#6BCB77',
    colorWarning: '#FFB900',
    colorError: '#FF6B6B',
    colorTextBase: '#2D3436',
    fontSize: 16,
    borderRadius: 8,
  },
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider theme={theme}>
      <RootLayout>{children}</RootLayout>
    </ConfigProvider>
  );
} 