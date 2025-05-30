import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { App } from 'antd';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "美妆社区",
  description: "分享美妆心得，交流护肤经验",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <App>
          {children}
        </App>
      </body>
    </html>
  );
}
