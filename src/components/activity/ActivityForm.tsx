import React from 'react';
import { useForm } from 'react-hook-form';
import { ActivityCreateData } from '@/types/activity';

interface ActivityFormProps {
  initialData?: Partial<ActivityCreateData>;
  onSubmit: (data: ActivityCreateData) => void;
  isLoading?: boolean;
  submitText?: string;
}

export const ActivityForm: React.FC<ActivityFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
  submitText = '保存',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivityCreateData>({
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          活动标题
        </label>
        <input
          type="text"
          id="title"
          {...register('title', { required: '请输入活动标题' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          活动描述
        </label>
        <textarea
          id="description"
          rows={4}
          {...register('description', { required: '请输入活动描述' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="cover_image" className="block text-sm font-medium text-gray-700">
          封面图片
        </label>
        <input
          type="file"
          id="cover_image"
          accept="image/*"
          {...register('cover_image')}
          className="mt-1 block w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
            开始时间
          </label>
          <input
            type="datetime-local"
            id="start_date"
            {...register('start_date', { required: '请选择开始时间' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
          {errors.start_date && (
            <p className="mt-1 text-sm text-red-600">{errors.start_date.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
            结束时间
          </label>
          <input
            type="datetime-local"
            id="end_date"
            {...register('end_date', { required: '请选择结束时间' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
          {errors.end_date && (
            <p className="mt-1 text-sm text-red-600">{errors.end_date.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
          标签（用逗号分隔）
        </label>
        <input
          type="text"
          id="tags"
          {...register('tags')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="例如：美妆,护肤,彩妆"
        />
      </div>

      <div className="flex justify-end mb-8">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-pink-600 py-2 px-6 text-lg font-medium text-white shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? submitText + '中...' : submitText}
        </button>
      </div>
    </form>
  );
}; 