import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { label: '首页', href: '/' },
    { label: '美妆课堂', href: '/course' },
    { label: '社区', href: '/community' },
    { label: '个人中心', href: '/profile' },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="美妆平台"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {/* 导航链接 */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-large font-medium transition-colors duration-200
                  ${pathname === item.href
                    ? 'text-primary-main'
                    : 'text-text-secondary hover:text-primary-main'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden text-text-primary"
            aria-label="打开菜单"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 