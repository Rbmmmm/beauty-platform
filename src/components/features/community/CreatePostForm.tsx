import React, { useState, useEffect } from 'react';
import { Upload, App } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import type { RcFile } from 'antd/es/upload';
import { PostCreateData } from '@/types/post';
import { activityService } from '@/services/activityService';
import { apiClient } from '@/services/api';
import type { Activity, Tag } from '@/types/activity';

interface CreatePostFormProps {
  onSubmit: (data: PostCreateData) => Promise<boolean>;
  onCancel: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onSubmit, onCancel }) => {
  const { message } = App.useApp();
  const [content, setContent] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    loadActivities();
    loadTags();
  }, []);

  const loadActivities = async () => {
    try {
      const res = await activityService.getActivities();
      console.log('Fetched Activities:', res.results);
      setActivities(res.results || []);
    } catch (error) {
      message.error('获取活动列表失败');
    }
  };

  const loadTags = async () => {
    try {
      const res = await apiClient.get('tags/');
      console.log('Fetched All Tags:', res.data.results);
      setTags(res.data.results || []);
    } catch (error) {
      message.error('获取标签列表失败');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      console.log('表单提交前验证:', {
        content: content,
        fileListLength: fileList.length,
        fileList: fileList.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type
        })),
        selectedActivity,
        selectedTags,
      });

      if (!content.trim()) {
        message.error('请输入帖子内容');
        return;
      }

      setLoading(true);

      // 将 UploadFile[] 转换为 File[]
      const files = fileList
        .filter(file => file.originFileObj)
        .map(file => file.originFileObj as File);

      console.log('准备提交的文件:', {
        filesCount: files.length,
        files: files.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type
        }))
      });

      const success = await onSubmit({
        content: content.trim(),
        images: files,
        activity: selectedActivity || undefined,
        tags: selectedTags.map(id => Number(id)),
      });

      if (success) {
        setContent('');
        setFileList([]);
        setSelectedActivity('');
        setSelectedTags([]);
        onCancel();
      }
    } catch (error) {
      console.error('表单提交失败:', error);
      message.error('表单提交失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    console.log('文件上传变化:', {
      newFiles: newFileList.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        status: file.status
      }))
    });
    setFileList(newFileList);
  };

  const handleActivityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedActivity(e.target.value);
    setSelectedTags([]);
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions).map(option => option.value);
    setSelectedTags(options);
  };

  // 根据所选活动动态筛选可选标签
  // 如果未选择活动，标签列表为空，并禁用选择框。
  // 如果选择了活动，显示所有标签中，不属于当前活动的标签。
  const currentActivity = activities.find(a => String(a.id) === selectedActivity);

  const availableTags = selectedActivity
    ? tags.filter(tag => 
        !currentActivity?.tags.some(activityTag => activityTag.id === tag.id)
      )
    : [];

  console.log('Selected Activity ID:', selectedActivity);
  console.log('Current Activity Object:', currentActivity);
  console.log('Available Tags for Selected Activity (Excluding):', availableTags);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div>
        <label htmlFor="activity" className="block text-sm font-medium text-gray-700 mb-1">关联活动</label>
        <select
          id="activity"
          value={selectedActivity}
          onChange={handleActivityChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="">不关联活动</option>
          {activities.map((activity) => (
            <option key={activity.id} value={activity.id}>{activity.title}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">选择标签（可多选）</label>
        <select
          id="tags"
          multiple
          value={selectedTags}
          onChange={handleTagsChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          disabled={!selectedActivity}
        >
          {availableTags.map((tag) => (
            <option key={tag.id} value={String(tag.id)}>{tag.name}</option>
          ))}
        </select>
        <p className="text-xs text-gray-400 mt-1">{selectedActivity ? '按住 Ctrl/Command 可多选' : '请先选择活动'}</p>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="分享你的美妆心得..."
        className="w-full p-4 border rounded-lg text-lg min-h-[120px]"
      />
      
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={handleUploadChange}
        beforeUpload={() => false}
        maxCount={9}
      >
        {fileList.length >= 9 ? null : (
          <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="mt-2">上传图片</div>
          </div>
        )}
      </Upload>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          取消
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 text-white rounded-lg ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#FF6B81] hover:bg-[#FF4D6D]'
          }`}
        >
          {loading ? '发布中...' : '发布'}
        </button>
      </div>
    </form>
  );
};

export default CreatePostForm; 