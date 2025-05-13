import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { HomeOutlined, BookOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';

const navItems = [
  { icon: <HomeOutlined />, label: '首页', path: '/' },
  { icon: <BookOutlined />, label: '课堂', path: '/course' },
  { icon: <TeamOutlined />, label: '社区', path: '/community' },
  { icon: <UserOutlined />, label: '我的', path: '/profile' },
];

const BottomNav: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav
      className="fixed left-1/2 -translate-x-1/2 bottom-6 z-50 w-[92vw] max-w-xl bg-white/80 backdrop-blur-md rounded-[32px] shadow-2xl flex justify-around items-center h-20 px-4 border border-[#FF6B81]/10"
      style={{ boxShadow: '0 8px 32px 0 rgba(255,107,129,0.10)' }}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <div
            key={item.path}
            className={`flex flex-col items-center cursor-pointer transition-all duration-200 ${
              isActive
                ? 'text-[#FF6B81] scale-110 font-bold'
                : 'text-gray-400 hover:text-[#FF6B81]/80'
            }`}
            onClick={() => router.push(item.path)}
          >
            <span className="text-3xl mb-1">{item.icon}</span>
            <span className="text-base tracking-wide select-none">
              {item.label}
            </span>
          </div>
        );
      })}
    </nav>
  );
};

export default BottomNav; 