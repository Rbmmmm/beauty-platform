import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Post } from '@/types/post';

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const router = useRouter();
  const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '') || 'http://localhost:8000';
  const cover = post.images?.[0]
    ? (post.images[0].startsWith('http') ? post.images[0] : `${backendUrl}${post.images[0]}`)
    : undefined;

  return (
    <div
      className="rounded-[28px] shadow-lg bg-white p-4 cursor-pointer hover:scale-[1.02] transition-transform"
      onClick={() => router.push(`/community/posts/${post.id}`)}
    >
      {/* 封面图片 */}
      {cover && (
        <div className="relative aspect-square rounded-2xl overflow-hidden mb-3">
          <Image
            src={cover}
            alt="封面"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            priority
          />
        </div>
      )}
      {/* 作者与内容摘要 */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-[#FFE5E5] flex items-center justify-center text-xl text-[#FF6B81] font-bold overflow-hidden">
          {post.author?.avatar ? (
            <Image src={post.author.avatar} alt={post.author.username} width={40} height={40} className="object-cover" />
          ) : (
            (post.author?.username || '用户')[0]
          )}
        </div>
        <div className="flex-1">
          <div className="font-bold text-[#FF6B81]">{post.author?.username || '匿名用户'}</div>
        </div>
      </div>
      <div className="text-lg text-gray-700 line-clamp-2 mb-2">{post.content}</div>
      {/* 数据区 */}
      <div className="flex gap-6 text-gray-500 text-base">
        <span>👍 {post.likes_count}</span>
        <span>💬 {post.comments_count}</span>
      </div>
    </div>
  );
};

export default PostCard; 