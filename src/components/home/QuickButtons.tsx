"use client";

import { useRouter } from 'next/navigation';

export function QuickButtons() {
  const router = useRouter();

  return (
    <div className="mt-8 grid grid-cols-2 gap-4">
      <button 
        className="bg-white p-4 rounded-lg shadow-md text-center hover:bg-gray-50 transition-colors"
        onClick={() => router.push('/course')}
      >
        <span className="text-xl">我的课程</span>
      </button>
      <button 
        className="bg-white p-4 rounded-lg shadow-md text-center hover:bg-gray-50 transition-colors"
        onClick={() => router.push('/community')}
      >
        <span className="text-xl">我的分享</span>
      </button>
    </div>
  );
} 