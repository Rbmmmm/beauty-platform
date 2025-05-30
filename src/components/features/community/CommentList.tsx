import React, { useState, useEffect } from 'react';
import { Comment } from '@/types/comment';
import { commentService } from '@/services/commentService';
import { formatTime } from '@/utils/formatTime';
import { HeartOutlined, HeartFilled, MessageOutlined, DeleteOutlined } from '@ant-design/icons';
import { message, Spin, Input, Button, Form } from 'antd';
import Image from 'next/image';

console.log('CommentList loaded');

interface CommentListProps {
  postId: string;
  onCommentChange?: () => void;
}

export const CommentList: React.FC<CommentListProps> = ({ postId, onCommentChange }) => {
  const [form] = Form.useForm();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // 加载评论列表
  const loadComments = async (pageNum: number = 1) => {
    try {
      setLoading(true);
      const response = await commentService.getComments(postId, pageNum);
      if (pageNum === 1) {
        setComments(response.results);
      } else {
        setComments(prev => [...prev, ...response.results]);
      }
      setHasMore(!!response.next);
      setInitialized(true);
    } catch (error) {
      message.error('加载评论失败');
    } finally {
      setLoading(false);
    }
  };

  // 提交评论
  const handleSubmit = async (values: { content: string }) => {
    if (!values.content?.trim()) {
      message.warning('请输入评论内容');
      return;
    }

    try {
      setSubmitting(true);
      const commentData = {
        content: values.content.trim(),
        ...(replyTo ? { parent: replyTo } : {})
      };

      console.log('提交评论:', {
        内容: commentData.content,
        帖子ID: postId,
        回复ID: replyTo
      });

      await commentService.createComment(postId, commentData.content, replyTo);

      message.success('评论成功');
      form.resetFields();
      setReplyTo(null);
      
      // 如果还没有加载过评论列表，先加载一次
      if (!initialized) {
        await loadComments(1);
      } else {
        // 否则重新加载当前页
        await loadComments(page);
      }
      
      onCommentChange?.();
    } catch (error: any) {
      console.error('评论失败:', error);
      message.error(error.message || '评论失败，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };

  // 点赞/取消点赞
  const handleLike = async (commentId: string, isLiked: boolean) => {
    try {
      if (isLiked) {
        await commentService.unlikeComment(postId, commentId);
      } else {
        await commentService.likeComment(postId, commentId);
      }
      loadComments(1);
    } catch (error) {
      message.error('操作失败');
    }
  };

  // 删除评论
  const handleDelete = async (commentId: string) => {
    try {
      await commentService.deleteComment(postId, commentId);
      message.success('删除成功');
      loadComments(1);
      onCommentChange?.();
    } catch (error) {
      message.error('删除失败');
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  return (
    <div className="space-y-6">
      {/* 评论表单 */}
      <Form
        form={form}
        onFinish={handleSubmit}
        className="bg-white rounded-2xl p-4"
      >
        <Form.Item
          name="content"
          rules={[{ required: true, message: '请输入评论内容' }]}
        >
          <Input.TextArea
            placeholder={replyTo ? "回复评论..." : "写下你的评论..."}
            autoSize={{ minRows: 2, maxRows: 6 }}
            className="text-lg"
          />
        </Form.Item>
        <Form.Item className="mb-0 flex justify-between">
          {replyTo && (
            <Button 
              type="link" 
              onClick={() => {
                setReplyTo(null);
                form.resetFields();
              }}
              className="text-gray-500"
            >
              取消回复
            </Button>
          )}
          <Button
            type="primary"
            htmlType="submit"
            loading={submitting}
            className="bg-[#FF6B81] hover:bg-[#FF8B9C]"
          >
            发布评论
          </Button>
        </Form.Item>
      </Form>

      {/* 评论列表 */}
      {initialized ? (
        <div className="space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="bg-white rounded-2xl p-4 space-y-2">
              {/* 评论作者信息 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#FFE5E5] flex items-center justify-center">
                  {comment.author.avatar ? (
                    <Image
                      src={comment.author.avatar}
                      alt={comment.author.username}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-[#FF6B81] text-xl font-bold">
                      {comment.author.username[0].toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-bold text-[#FF6B81]">{comment.author.username}</div>
                  <div className="text-sm text-gray-500">{formatTime(comment.created_at)}</div>
                </div>
              </div>

              {/* 评论内容 */}
              <div className="text-gray-700 text-lg pl-13">{comment.content}</div>

              {/* 评论操作 */}
              <div className="flex items-center gap-4 pl-13">
                <button
                  onClick={() => handleLike(comment.id, comment.is_liked)}
                  className="flex items-center gap-1 text-gray-500 hover:text-[#FF6B81]"
                >
                  {comment.is_liked ? <HeartFilled className="text-[#FF6B81]" /> : <HeartOutlined />}
                  <span>{comment.likes_count}</span>
                </button>
                <button
                  onClick={() => {
                    setReplyTo(comment.id);
                    form.setFieldsValue({ content: '' });
                  }}
                  className="flex items-center gap-1 text-gray-500 hover:text-[#FF6B81]"
                >
                  <MessageOutlined />
                  <span>回复</span>
                </button>
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="flex items-center gap-1 text-gray-500 hover:text-[#FF6B81]"
                >
                  <DeleteOutlined />
                  <span>删除</span>
                </button>
              </div>

              {/* 回复列表 */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="pl-13 space-y-2">
                  {comment.replies.map(reply => (
                    <div key={reply.id} className="bg-gray-50 rounded-xl p-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#FF6B81]">{reply.author.username}</span>
                        <span className="text-sm text-gray-500">{formatTime(reply.created_at)}</span>
                      </div>
                      <div className="text-gray-700 mt-1">{reply.content}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* 加载更多按钮 */}
          {hasMore && (
            <div className="text-center">
              <Button
                onClick={() => loadComments(page + 1)}
                loading={loading}
                className="text-[#FF6B81]"
              >
                加载更多评论
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-4">
          <Button
            type="link"
            onClick={() => loadComments(1)}
            loading={loading}
          >
            加载评论
          </Button>
        </div>
      )}

      {/* 加载状态 */}
      {loading && <div className="text-center"><Spin /></div>}
    </div>
  );
}; 