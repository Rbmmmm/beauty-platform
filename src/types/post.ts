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

export interface User {
  id: number;
  username: string;
  nickname: string;
  avatar?: string;
}

export interface Comment {
  id: number;
  author: User;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: number;
  author: User;
  content: string;
  images: string[];
  category?: {
    id: number;
    name: string;
  };
  tags: string[];
  likes_count: number;
  comments_count: number;
  collections_count: number;
  is_liked: boolean;
  is_collected: boolean;
  created_at: string;
  updated_at: string;
  comments?: Comment[];
}

export interface PostCreateData {
  content: string;
  images?: File[];
  category?: number;
  tags?: string[];
}

export interface PostUpdateData extends Partial<PostCreateData> {}

export interface CategoryPostsResponse {
  category: Category;
  posts: Post[];
  total: number;
  page: number;
  pageSize: number;
} 