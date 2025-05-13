"use client";

import React, { useState } from "react";

const mockTopics = ["美妆心得", "护肤交流", "母女同妆", "晒妆容", "抗老经验", "广场舞妆容"];

const mockPosts = [
  {
    user: "时尚奶奶",
    avatar: "",
    content: "今天和女儿一起尝试了清新自然妆，感觉年轻了10岁！",
    img: "",
    likes: 32,
    comments: 8,
    shares: 2,
  },
  {
    user: "优雅阿姨",
    avatar: "",
    content: "分享一下我的抗老护肤小妙招，欢迎姐妹们留言交流~",
    img: "",
    likes: 21,
    comments: 5,
    shares: 1,
  },
  {
    user: "广场舞达人",
    avatar: "",
    content: "跳舞前一定要定妆，推荐一款超好用的定妆喷雾！",
    img: "",
    likes: 18,
    comments: 3,
    shares: 0,
  },
];

export default function CommunityPage() {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#FFF5F7] to-[#FFF] px-4 pb-12">
      {/* 标题 */}
      <h1 className="text-[40px] font-extrabold text-[#FF6B81] mb-6 mt-8">社区</h1>
      {/* 发帖入口 */}
      <button className="mb-8 px-8 py-4 rounded-full bg-[#FF6B81] text-white text-2xl font-bold shadow hover:bg-[#FF6B81]/90 transition-all">+ 发帖</button>
      {/* 热门话题标签 */}
      <div className="flex flex-wrap gap-4 mb-8 w-full max-w-3xl justify-center">
        {mockTopics.map(topic => (
          <button
            key={topic}
            className={`px-6 py-2 rounded-full text-xl font-bold border-2 transition-all ${activeTopic === topic ? 'bg-[#FF6B81] text-white border-[#FF6B81]' : 'bg-white text-[#FF6B81] border-[#FF6B81]/40 hover:bg-[#FF6B81]/10'}`}
            onClick={() => setActiveTopic(topic === activeTopic ? null : topic)}
          >
            #{topic}
          </button>
        ))}
      </div>
      {/* 帖子卡片区 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {mockPosts
          .filter(post => !activeTopic || post.content.includes(activeTopic))
          .map((post, idx) => (
          <div key={idx} className="rounded-[28px] shadow-lg bg-white p-6 flex flex-col gap-4">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-full bg-[#FFE5E5] flex items-center justify-center text-2xl text-[#FF6B81] font-bold">
                {post.user[0]}
              </div>
              <div className="text-xl font-bold text-[#FF6B81]">{post.user}</div>
            </div>
            <div className="text-xl text-gray-700 mb-2">{post.content}</div>
            {/* 图片占位 */}
            <div className="w-full h-48 rounded-2xl bg-[#F3F4F6] flex items-center justify-center text-gray-300 text-2xl mb-2">图片</div>
            {/* 操作按钮 */}
            <div className="flex gap-8 mt-2">
              <button className="flex items-center gap-2 text-lg text-[#FF6B81] hover:scale-110 transition-transform"><span>👍</span>{post.likes}</button>
              <button className="flex items-center gap-2 text-lg text-[#FF6B81] hover:scale-110 transition-transform"><span>💬</span>{post.comments}</button>
              <button className="flex items-center gap-2 text-lg text-[#FF6B81] hover:scale-110 transition-transform"><span>🔗</span>{post.shares}</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
} 