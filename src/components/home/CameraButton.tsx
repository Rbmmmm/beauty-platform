"use client";

import { CameraOutlined } from '@ant-design/icons';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function CameraButton() {
  const router = useRouter();

  return (
    <Card className="p-6 h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#FFE5E5] to-[#FFF0F0]">
      <h2 className="text-2xl font-bold text-[#FF6B81] mb-8">智能肤质检测</h2>
      <div className="flex-1 flex items-center justify-center">
        <Button
          className="w-32 h-32 rounded-full bg-white flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 shadow-lg"
          onClick={() => router.push('/skin')}
        >
          <CameraOutlined className="text-3xl text-[#FF6B81] mb-2" />
          <span className="text-lg font-medium text-[#FF6B81]">开始检测</span>
        </Button>
      </div>
      <div className="text-center mt-8">
        <p className="text-lg text-gray-600 font-medium mb-1">轻触开始智能检测</p>
        <p className="text-gray-500">为您定制专属美妆方案</p>
      </div>
    </Card>
  );
} 