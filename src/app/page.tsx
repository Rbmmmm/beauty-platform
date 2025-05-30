"use client";

import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { CameraOutlined, AudioOutlined, HomeOutlined, BookOutlined, UserOutlined, ShareAltOutlined } from '@ant-design/icons';
import CardCarousel, { CardCarouselItem } from '@/components/common/CardCarousel';
import Link from 'next/link';
import { activityService } from '@/services/activityService';
import type { Activity } from '@/types/activity';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 创建 QueryClient 实例
const queryClient = new QueryClient();

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
          <Link href="/agent" className="w-32 h-32 rounded-full bg-white flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg">
            <AudioOutlined className="text-3xl text-[#4CAF50] mb-2" />
            <span className="text-lg font-medium text-[#4CAF50]">按住说话</span>
          </Link>
        </div>
        <div className="text-center mt-8">
          <p className="text-lg text-gray-600 font-medium mb-1">贴心的美妆小帮手</p>
          <p className="text-gray-500">随时解答您的美妆问题</p>
        </div>
      </div>
    ),
  },
  {
    title: '护肤助手',
    description: '获取每日个性化护肤建议',
    content: (
      <div className="w-[320px] h-[380px] bg-gradient-to-br from-[#E3F4EA] to-[#F0F9E8] rounded-[28px] p-6 flex flex-col items-start justify-between shadow-lg">
        <div className="w-full">
          <h3 className="text-2xl font-bold text-[#4CAF50] mb-4">护肤助手</h3>
          <div className="flex items-center justify-between text-base mb-3 text-gray-600">
            <span>上海今天晴，22°C</span>
            <span>湿度 35%，紫外线 4 级 🌤️</span>
          </div>
        </div>

        <div className="w-full bg-white/80 rounded-xl p-4 shadow-md flex-grow flex flex-col justify-center">
          <h4 className="text-xl font-bold text-[#4CAF50] mb-2 text-center">今日护肤建议</h4>
          <p className="text-gray-600 text-base text-center">根据您的肤质和天气，为您提供专属护肤建议。</p>
        </div>

        <Link href="/skincare-agent" className="w-full">
          <button className="w-full py-3 bg-[#4CAF50]/10 rounded-lg text-[#4CAF50] font-medium hover:bg-[#4CAF50]/20 transition-colors">
            获取护肤建议
          </button>
        </Link>
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

// 将 HomePage 组件包装在 QueryClientProvider 中
export default function HomePageWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  );
}

function HomePage() {
  const { data: activitiesResponse = { results: [] }, isLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: () => activityService.getActivities(),
  });

  // 从分页响应中获取活动列表
  const activities = activitiesResponse.results || [];

  // 只生成一个"精彩活动"卡片，内容为所有活动名称列表
  const activityCardItems: CardCarouselItem[] = [
    {
      title: '精彩活动',
      description: '',
      content: (
        <div className="w-[320px] h-[380px] bg-gradient-to-br from-[#FFF5E5] to-[#FFF0F0] rounded-[28px] p-6 flex flex-col items-center justify-center shadow-lg">
          <h3 className="text-2xl font-bold text-[#FF6B81] text-center mb-6">精彩活动</h3>
          {activities.length > 0 ? (
            <ul className="w-full space-y-4">
              {activities.map((activity) => (
                <li key={activity.id} className="text-xl text-center text-[#FF6B81] bg-white/80 rounded-lg py-3 px-2 shadow">
                  {activity.title}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-400 text-lg text-center">暂无活动</div>
          )}
        </div>
      ),
    },
  ];

  // 合并卡片
  const allCardItems = [
    ...cardItems.slice(0, 3),
    ...activityCardItems,
  ];

  // 添加调试日志
  console.log('Loading:', isLoading);
  console.log('Activities Response:', activitiesResponse);
  console.log('Activities:', activities);
  console.log('Activity Cards:', activityCardItems);
  console.log('Original Cards:', cardItems);
  console.log('All Cards:', allCardItems);
  console.log('All Cards Length:', allCardItems.length);

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
        {isLoading ? (
          <div className="text-center">加载中...</div>
        ) : (
          <CardCarousel items={allCardItems} />
        )}
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

