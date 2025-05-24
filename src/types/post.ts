export interface Author {
  id: string;
  username: string;
  avatar?: string;
}

export interface Comment {
  id: string;
  content: string;
  author: Author;
  createdAt: string;
  likes: number;
  replies?: Comment[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon?: string;
  postCount: number;
}

export interface Post {
  id: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
  };
  content: string;
  images?: string[];
  category?: string;
  tags?: string[];
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
  is_collected: boolean;
  created_at: string;
  updated_at?: string;
}

export interface CreatePostData {
  content: string;
  images?: File[];
  category?: string;
  tags?: string[];
}

export interface UpdatePostData {
  content?: string;
  images?: File[];
  category?: string;
  tags?: string[];
}

export interface CategoryPostsResponse {
  category: Category;
  posts: Post[];
  total: number;
  page: number;
  pageSize: number;
} 