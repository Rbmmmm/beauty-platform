import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Activity } from '@/types/activity';
import { activityService } from '@/services/activityService';
import { useToast } from '@/components/ui/use-toast';
import type { Tag } from '@/types/activity';
import { apiClient } from '@/services/api';

interface PostFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export const PostForm: React.FC<PostFormProps> = ({ onSubmit, isLoading = false }) => {
  const { toast } = useToast();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    loadActivities();
    loadTags();
  }, []);

  const loadActivities = async () => {
    try {
      const data = await activityService.getActivities('ongoing');
      setActivities(data);
    } catch (error) {
      toast({
        title: '加载失败',
        description: '获取活动列表失败，请稍后重试',
        variant: 'destructive',
      });
    }
  };

  const loadTags = async () => {
    try {
      const res = await apiClient.get('tags/');
      setTags(res.data.results || []);
    } catch (error) {
      toast({
        title: '加载失败',
        description: '获取标签列表失败，请稍后重试',
        variant: 'destructive',
      });
    }
  };

  const handleFormSubmit = (data: any) => {
    if (Array.isArray(data.tags)) {
      data.tags = data.tags.map((id: string) => Number(id));
    } else if (typeof data.tags === 'string' && data.tags) {
      data.tags = [Number(data.tags)];
    } else {
      data.tags = [];
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          内容
        </label>
        <textarea
          id="content"
          rows={4}
          {...register('content', { required: '请输入内容' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="images" className="block text-sm font-medium text-gray-700">
          图片
        </label>
        <input
          type="file"
          id="images"
          multiple
          accept="image/*"
          {...register('images')}
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <label htmlFor="activity" className="block text-sm font-medium text-gray-700">
          关联活动
        </label>
        <select
          id="activity"
          {...register('activity')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="">不关联活动</option>
          {activities.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activity.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
          选择标签（可多选）
        </label>
        <select
          id="tags"
          multiple
          {...register('tags')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-400 mt-1">按住 Ctrl/Command 可多选</p>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? '发布中...' : '发布'}
        </button>
      </div>
    </form>
  );
}; 