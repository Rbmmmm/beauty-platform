import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background-paper py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 关于我们 */}
          <div>
            <h3 className="text-xxlarge font-bold mb-4">关于我们</h3>
            <p className="text-large text-text-secondary">
              美妆平台致力于为银发女性提供专业的美妆服务和社交互动平台。
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-xxlarge font-bold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/course"
                  className="text-large text-text-secondary hover:text-primary-main"
                >
                  美妆课堂
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-large text-text-secondary hover:text-primary-main"
                >
                  社区互动
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-large text-text-secondary hover:text-primary-main"
                >
                  个人中心
                </Link>
              </li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h3 className="text-xxlarge font-bold mb-4">联系我们</h3>
            <ul className="space-y-2">
              <li className="text-large text-text-secondary">
                客服热线：400-888-8888
              </li>
              <li className="text-large text-text-secondary">
                服务时间：9:00-21:00
              </li>
            </ul>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-large text-text-secondary text-center">
            © {new Date().getFullYear()} 美妆平台 版权所有
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 