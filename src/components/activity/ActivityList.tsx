import React from 'react';
import { Activity } from '@/types/activity';
import { ActivityCard } from './ActivityCard';

interface ActivityListProps {
  activities: Activity[];
  className?: string;
}

export const ActivityList: React.FC<ActivityListProps> = ({ activities, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}; 