'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ActivityForm } from '@/components/activity/ActivityForm';
import { activityService } from '@/services/activityService';
import { ActivityCreateData } from '@/types/activity';
import { useToast } from '@/components/ui/use-toast';

export default function CreateActivityPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: ActivityCreateData) => {
    setIsLoading(true);
    try {
      await activityService.createActivity(data);
      toast({
        title: '创建成功',
        description: '活动已成功创建',
      });
      router.push('/admin/activities');
    } catch (error) {
      toast({
        title: '创建失败',
        description: '创建活动失败，请稍后重试',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">创建活动</h1>
        <ActivityForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
} 