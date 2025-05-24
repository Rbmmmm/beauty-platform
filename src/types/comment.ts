import { User } from './user';

export interface Comment {
  id: string;
  author: User;
  content: string;
  parent?: string;
  likes_count: number;
  is_liked: boolean;
  replies?: Comment[];
  created_at: string;
}

export interface CreateCommentData {
  content: string;
  parent?: string;
}

export interface CommentResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Comment[];
} 