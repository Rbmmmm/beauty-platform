"use client";

import { useState } from 'react';
import { Carousel } from 'antd';
import type { Activity } from '@/types/activity';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarOutlined, TagOutlined } from '@ant-design/icons';

interface ActivityCarouselProps {
  activities: Activity[];
}

export function ActivityCarousel({ activities }: ActivityCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!activities.length) {
    return (
      <Card className="p-6 h-full flex items-center justify-center">
        <p className="text-gray-500 text-center">暂无进行中的活动</p>
      </Card>
    );
  }

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold mb-4">精彩活动</h2>
      <Carousel
        afterChange={setCurrentSlide}
        className="bg-white rounded-lg shadow-md"
      >
        {activities.map((activity) => (
          <div key={activity.id} className="p-6">
            {activity.cover_image && (
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <img
                  src={activity.cover_image}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{activity.description}</p>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center text-gray-500">
                <CalendarOutlined className="mr-1" />
                <span>{new Date(activity.start_date).toLocaleDateString()}</span>
              </div>
              {activity.tags && activity.tags.length > 0 && (
                <div className="flex items-center text-gray-500">
                  <TagOutlined className="mr-1" />
                  <span>{activity.tags[0]}</span>
                </div>
              )}
            </div>
            <Button
              className="w-full"
              onClick={() => window.location.href = `/community/activities/${activity.id}`}
            >
              查看详情
            </Button>
          </div>
        ))}
      </Carousel>
      <div className="flex justify-center mt-4">
        {activities.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 mx-1 rounded-full ${
              currentSlide === index ? 'bg-primary' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
} 