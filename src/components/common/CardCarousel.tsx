"use client";
import React, { useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

export interface CardCarouselItem {
  title: string;
  description: string;
  img?: string;
  content?: React.ReactNode; // 支持自定义内容
  [key: string]: any;
}

interface CardCarouselProps {
  items: CardCarouselItem[];
  renderCard?: (item: CardCarouselItem, idx: number, isActive: boolean) => React.ReactNode;
  className?: string;
}

const getIndex = (idx: number, len: number) => (idx + len) % len;

const CardCarousel: React.FC<CardCarouselProps> = ({ items, renderCard, className = '' }) => {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const len = items.length;

  // 循环切换
  const go = (dir: number) => {
    setCurrent((prev) => getIndex(prev + dir, len));
  };

  // 处理触摸事件
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) { // 最小滑动距离
      go(diff > 0 ? 1 : -1);
    }
  };

  // 渲染卡片内容
  const renderCardContent = (item: CardCarouselItem, idx: number, isActive: boolean) => {
    if (item.content) return item.content;
    if (renderCard) return renderCard(item, idx, isActive);
    return (
      <div className={`rounded-[28px] bg-white p-8 w-[320px] h-[380px] flex flex-col items-center justify-center border border-[#F3F4F6] ${isActive ? 'ring-4 ring-[#FF6B81]/20' : ''}`}>
        {item.img && <img src={item.img} alt={item.title} className="w-24 h-24 object-cover rounded-xl mb-4" />}
        <h3 className="text-2xl font-bold mb-2 text-[#FF6B81]">{item.title}</h3>
        <p className="text-gray-500 text-center text-lg">{item.description}</p>
      </div>
    );
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div 
        className="relative flex items-center justify-center h-[460px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* 左箭头 */}
        <button
          className="flex absolute left-8 z-30 h-14 w-14 items-center justify-center rounded-full bg-white/80 shadow-lg border border-[#FF6B81]/20 text-[#FF6B81] hover:bg-[#FF6B81]/10 hover:scale-110 transition-all duration-200"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
          onClick={() => go(-1)}
          aria-label="上一个卡片"
        >
          <LeftOutlined className="text-2xl" />
        </button>

        {/* 卡片容器 */}
        <div className="relative w-full max-w-[1120px] h-full mx-auto">
          {items.map((item, idx) => {
            const pos = getIndex(idx - current, len);
            let style = '';
            
            if (pos === 0) {
              style = 'z-20 scale-110 opacity-100 translate-x-0';
            } else if (pos === 1) {
              style = 'z-10 scale-90 opacity-60 translate-x-[420px]';
            } else if (pos === len - 1) {
              style = 'z-10 scale-90 opacity-60 -translate-x-[420px]';
            } else {
              style = 'opacity-0 scale-75 pointer-events-none';
            }

            return (
              <div
                key={idx}
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out rounded-[28px] overflow-hidden ${style}`}
                style={{ willChange: 'transform, opacity' }}
                onClick={() => pos !== 0 && setCurrent(idx)}
              >
                {renderCardContent(item, idx, pos === 0)}
              </div>
            );
          })}
        </div>

        {/* 右箭头 */}
        <button
          className="flex absolute right-8 z-30 h-14 w-14 items-center justify-center rounded-full bg-white/80 shadow-lg border border-[#FF6B81]/20 text-[#FF6B81] hover:bg-[#FF6B81]/10 hover:scale-110 transition-all duration-200"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
          onClick={() => go(1)}
          aria-label="下一个卡片"
        >
          <RightOutlined className="text-2xl" />
        </button>

        {/* 指示点 */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === current ? 'bg-[#FF6B81] w-6' : 'bg-gray-300'
              }`}
              onClick={() => setCurrent(idx)}
              aria-label={`切换到第${idx + 1}个卡片`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardCarousel; 