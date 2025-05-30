export interface Tag {
  id: number;
  name: string;
  color: string;
  created_at: string;
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  cover_image?: string;
  tags: Tag[];
  created_at: string;
  updated_at: string;
}

export interface ActivityCreateData {
  title: string;
  description: string;
  cover_image?: File;
  tags?: number[];
}

export interface ActivityUpdateData {
  title?: string;
  description?: string;
  cover_image?: File;
  tags?: number[];
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
} 