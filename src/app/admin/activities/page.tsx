'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Activity } from '@/types/activity';
import { activityService } from '@/services/activityService';
import { ActivityList } from '@/components/activity/ActivityList';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function ActivitiesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const data = await activityService.getActivities();
      setActivities(data);
    } catch (error) {
      toast({
        title: '加载失败',
        description: '获取活动列表失败，请稍后重试',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这个活动吗？')) return;

    try {
      await activityService.deleteActivity(id);
      toast({
        title: '删除成功',
        description: '活动已成功删除',
      });
      loadActivities();
    } catch (error) {
      toast({
        title: '删除失败',
        description: '删除活动失败，请稍后重试',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">加载中...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">活动管理</h1>
        <Button onClick={() => router.push('/admin/activities/create')}>
          创建活动
        </Button>
      </div>

      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">{activity.title}</h2>
                <p className="text-gray-600 mt-1">{activity.description}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => router.push(`/admin/activities/${activity.id}/edit`)}
                >
                  编辑
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(activity.id)}
                >
                  删除
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
              <div>
                <span>开始时间：{new Date(activity.start_date).toLocaleString()}</span>
              </div>
              <div>
                <span>结束时间：{new Date(activity.end_date).toLocaleString()}</span>
              </div>
              <div>
                <span>状态：{activity.status}</span>
              </div>
              <div>
                <span>帖子数：{activity.posts_count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 