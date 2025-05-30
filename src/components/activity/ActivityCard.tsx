import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Activity } from '@/types/activity';
import { formatDate } from '@/utils/format';

interface ActivityCardProps {
  activity: Activity;
  className?: string;
}

const statusColors = {
  upcoming: 'bg-blue-100 text-blue-800',
  ongoing: 'bg-green-100 text-green-800',
  ended: 'bg-gray-100 text-gray-800',
};

const statusText = {
  upcoming: '即将开始',
  ongoing: '进行中',
  ended: '已结束',
};

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity, className = '' }) => {
  return (
    <Link href={`/activities/${activity.id}`} className={`block ${className}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48">
          <Image
            src={activity.cover_image}
            alt={activity.title}
            fill
            className="object-cover"
          />
          <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-sm ${statusColors[activity.status]}`}>
            {statusText[activity.status]}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 line-clamp-1">{activity.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{activity.description}</p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div>
              <span>开始：{formatDate(activity.start_date)}</span>
            </div>
            <div>
              <span>{activity.posts_count} 个帖子</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}; 