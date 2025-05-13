"use client";
import React from 'react';
import { Layout } from 'antd';
import BottomNav from '@/components/common/BottomNav';
import RemoteHelpButton from '@/components/common/RemoteHelpButton';
import { usePathname } from 'next/navigation';

const { Header, Content } = Layout;

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  return (
    <Layout className="min-h-screen bg-white">
      <Header
        className="fixed w-full z-20 flex items-center justify-center px-0 py-0 bg-gradient-to-b from-white/95 via-white/90 to-[#FFF5F7]/80 backdrop-blur-md shadow-[0_2px_16px_0_rgba(255,107,129,0.06)] border-b border-[#F3F4F6]"
        style={{ height: 72 }}
      >
        <div className="w-full max-w-5xl flex items-center justify-between px-8">
          <div className="text-2xl font-extrabold text-[#FF6B81] tracking-wide drop-shadow-sm select-none">美丽时光</div>
          <RemoteHelpButton />
        </div>
      </Header>
      
      <Content className="pt-[88px] pb-[120px] bg-white min-h-screen">
        {children}
      </Content>

      {!(pathname && pathname.startsWith('/skin')) && <BottomNav />}
    </Layout>
  );
};

export default RootLayout; 