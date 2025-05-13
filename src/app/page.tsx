"use client";

import React from 'react';
import { Button } from 'antd';
import { CameraOutlined, AudioOutlined, HomeOutlined, BookOutlined, UserOutlined, ShareAltOutlined } from '@ant-design/icons';
import CardCarousel, { CardCarouselItem } from '@/components/common/CardCarousel';
import Link from 'next/link';

const cardItems: CardCarouselItem[] = [
  {
    title: '智能肤质检测',
    description: '轻触开始智能检测',
    content: (
      <div className="w-[320px] h-[380px] bg-gradient-to-b from-[#FFE5E5] to-[#FFF0F0] rounded-[28px] p-6 flex flex-col items-center shadow-lg">
        <h3 className="text-2xl font-bold text-[#FF6B81] mb-8">智能肤质检测</h3>
        <div className="flex-1 flex items-center justify-center">
          <div
            className="w-32 h-32 rounded-full bg-white flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg"
            onClick={() => window.location.href = '/skin'}
            role="button"
            tabIndex={0}
            aria-label="开始检测"
          >
            <CameraOutlined className="text-3xl text-[#FF6B81] mb-2" />
            <span className="text-lg font-medium text-[#FF6B81]">开始检测</span>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-lg text-gray-600 font-medium mb-1">轻触开始智能检测</p>
          <p className="text-gray-500">为您定制专属美妆方案</p>
        </div>
      </div>
    ),
  },
  {
    title: '智能语音助手',
    description: '贴心的美妆小帮手',
    content: (
      <div className="w-[320px] h-[380px] bg-gradient-to-b from-[#E3F4EA] to-[#F0F9E8] rounded-[28px] p-6 flex flex-col items-center shadow-lg">
        <h3 className="text-2xl font-bold text-[#4CAF50] mb-8">智能语音助手</h3>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-white flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg">
            <AudioOutlined className="text-3xl text-[#4CAF50] mb-2" />
            <span className="text-lg font-medium text-[#4CAF50]">按住说话</span>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-lg text-gray-600 font-medium mb-1">贴心的美妆小帮手</p>
          <p className="text-gray-500">随时解答您的美妆问题</p>
        </div>
      </div>
    ),
  },
  {
    title: '今日妆容推荐',
    description: '根据天气和肤质为您推荐',
    content: (
      <div className="w-[320px] h-[380px] bg-gradient-to-br from-[#FFE5E5] to-[#FFF0F0] rounded-[28px] p-6 flex flex-col items-start justify-between shadow-lg">
        <div className="w-full">
          <h3 className="text-2xl font-bold text-[#FF6B81] mb-4">今日妆容推荐</h3>
          <div className="flex items-center justify-between text-base mb-3">
            <span className="text-gray-600">今日天气：晴朗 26°C</span>
            <span className="text-[#FF6B81] font-medium">适合外出</span>
          </div>
        </div>

        <div className="w-full bg-white/80 rounded-xl p-4 shadow-md">
          <h4 className="text-xl font-bold text-[#FF6B81] mb-2">清新自然妆</h4>
          <p className="text-gray-600 mb-2">根据您的肤质特点，为您推荐：</p>
          <ul className="space-y-2 text-gray-600 text-base">
            <li className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#FF6B81] mr-2"></span>
              轻薄透气的防晒隔离
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#FF6B81] mr-2"></span>
              水润清透的粉底液
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#FF6B81] mr-2"></span>
              淡雅自然的腮红
            </li>
          </ul>
        </div>

        <button className="w-full py-3 bg-[#FF6B81]/10 rounded-lg text-[#FF6B81] font-medium hover:bg-[#FF6B81]/20 transition-colors">
          查看详细步骤
        </button>
      </div>
    ),
  },
  {
    title: '精彩活动',
    description: '母女妆容挑战、广场舞美妆等',
    content: (
      <div className="w-[320px] h-[380px] bg-gradient-to-br from-[#FFF5E5] to-[#FFF0F0] rounded-[28px] p-6 flex flex-col items-start justify-between shadow-lg">
        <h3 className="text-2xl font-bold text-[#FF6B81] w-full mb-4">精彩活动</h3>
        
        <div className="w-full space-y-4">
          <div className="p-4 bg-white/90 rounded-xl shadow-md hover:scale-[1.02] transition-transform cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-semibold text-[#FF6B81]">母女妆容挑战</h4>
              <span className="text-xs text-white px-3 py-1 bg-[#FF6B81] rounded-full">进行中</span>
            </div>
            <p className="text-gray-600 text-base mb-2">与女儿共同创造美丽回忆</p>
            <div className="flex items-center text-sm text-gray-500">
              <span className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B81] mr-1"></span>
                已有 2,358 对母女参与
              </span>
            </div>
          </div>
          
          <div className="p-4 bg-white/90 rounded-xl shadow-md hover:scale-[1.02] transition-transform cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-semibold text-[#FF6B81]">广场舞美妆</h4>
              <span className="text-xs text-white px-3 py-1 bg-[#FF6B81] rounded-full">报名中</span>
            </div>
            <p className="text-gray-600 text-base mb-2">为您的舞台增添光彩</p>
            <div className="flex items-center text-sm text-gray-500">
              <span className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B81] mr-1"></span>
                已有 1,892 人报名
              </span>
            </div>
          </div>
        </div>

        <button className="w-full py-3 bg-[#FF6B81]/10 rounded-lg text-[#FF6B81] font-medium hover:bg-[#FF6B81]/20 transition-colors">
          查看更多活动
        </button>
      </div>
    ),
  },
];

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* 标题区域 */}
      <section className="text-center mb-16 px-4">
        <h2 className="text-[44px] md:text-[56px] font-extrabold bg-gradient-to-r from-[#FF6B81] to-[#FFC3A0] bg-clip-text text-transparent mb-6 tracking-tight drop-shadow-sm animate-fade-in">
          发现专属于您的美
        </h2>
        <p className="text-2xl text-gray-500 max-w-2xl mx-auto font-medium animate-fade-in-up">
          智能分析您的肤质特点，定制专属美妆方案
        </p>
      </section>

      {/* 卡片轮播区 */}
      <div className="w-full flex justify-center mb-16">
        <CardCarousel items={cardItems} />
      </div>

      {/* 快捷按钮区 */}
      <div className="flex justify-center gap-6 px-4">
        <Button
          size="large"
          icon={<BookOutlined />}
          className="h-14 px-8 text-lg font-medium rounded-full bg-gradient-to-r from-[#FF6B81] to-[#FFC3A0] border-0 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          我的课程
        </Button>
        <Button
          size="large"
          icon={<ShareAltOutlined />}
          className="h-14 px-8 text-lg font-medium rounded-full bg-gradient-to-r from-[#A8E6CF] to-[#FF6B81] border-0 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          我的分享
        </Button>
      </div>

      {/* 添加全局样式 */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </main>
  );
}
