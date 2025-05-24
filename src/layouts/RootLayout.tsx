import React from 'react';
import { Layout } from 'antd';
import { PAGE_TITLES } from '@/constants';
import BottomNav from '@/components/common/BottomNav';
import RemoteHelpButton from '@/components/common/RemoteHelpButton';

const { Header, Content, Footer } = Layout;

interface RootLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children, title }) => {
  return (
    <Layout className="min-h-screen">
      <Header className="bg-white px-4 flex items-center justify-between shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">{title || PAGE_TITLES.HOME}</h1>
        <RemoteHelpButton />
      </Header>
      
      <Content className="p-4">
        {children}
      </Content>
      
      <Footer className="p-0">
        <BottomNav />
      </Footer>
    </Layout>
  );
};

export default RootLayout; 