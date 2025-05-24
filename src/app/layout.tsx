import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConfigProvider, App as AntdApp } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import RootLayout from "@/components/layout/RootLayout";
import Providers from "@/components/providers";

// 从 providers 中导入主题配置
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

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "银发美妆智能平台",
  description: "专为银发女性打造的智能美妆平台",
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <ConfigProvider theme={theme} locale={zhCN}>
          <AntdApp>
            <Providers>
              <RootLayout>{children}</RootLayout>
            </Providers>
          </AntdApp>
        </ConfigProvider>
      </body>
    </html>
  );
}
