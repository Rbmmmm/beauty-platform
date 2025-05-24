import React, { useState } from 'react';
import Image from 'next/image';
import { Comment } from '@/types/post';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
  onLikeComment: (commentId: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  onAddComment,
  onLikeComment,
}) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(newComment);
    setNewComment('');
  };

  return (
    <div className="bg-white rounded-[28px] p-6 shadow-lg">
      <h3 className="text-2xl font-bold text-[#FF6B81] mb-6">评论 ({comments.length})</h3>

      {/* 评论输入框 */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="写下你的评论..."
            className="flex-1 p-4 text-lg rounded-2xl border border-gray-200 focus:border-[#FF6B81] focus:ring-2 focus:ring-[#FFE5E5] outline-none resize-none"
            rows={2}
          />
          <button
            type="submit"
            className="px-6 py-2 text-lg text-white bg-[#FF6B81] rounded-full hover:bg-[#FF4D6D] transition-colors self-end"
          >
            发送
          </button>
        </div>
      </form>

      {/* 评论列表 */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FFE5E5] flex items-center justify-center text-xl text-[#FF6B81] font-bold overflow-hidden flex-shrink-0">
              {comment.author.avatar ? (
                <Image
                  src={comment.author.avatar}
                  alt={comment.author.username}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              ) : (
                comment.author.username[0]
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-bold text-[#FF6B81]">
                  {comment.author.username}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-lg text-gray-700 mb-2">{comment.content}</p>
              <button
                onClick={() => onLikeComment(comment.id)}
                className="flex items-center gap-1 text-[#FF6B81] hover:scale-110 transition-transform"
              >
                {comment.isLiked ? <HeartFilled /> : <HeartOutlined />}
                <span>{comment.likes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection; 