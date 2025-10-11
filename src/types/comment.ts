// src/types/comment.ts
export interface Comment {
  id: string;
  cat_id: string;
  user_id: string;
  content: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  profiles?: {
    name: string;
  };
}
