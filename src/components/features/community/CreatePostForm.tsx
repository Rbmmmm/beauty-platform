import React, { useState } from 'react';
import { Upload, App } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import type { RcFile } from 'antd/es/upload';
import { PostCreateData } from '@/types/post';

interface CreatePostFormProps {
  onSubmit: (data: PostCreateData) => Promise<boolean>;
  onCancel: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onSubmit, onCancel }) => {
  const { message } = App.useApp();
  const [content, setContent] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);

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
        }))
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
        images: files
      });

      if (success) {
        setContent('');
        setFileList([]);
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
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