// src/lib/commentApi.ts
import { createClient } from "@/utils/supabase/server";
import type { Comment } from "@/types/comment";

export async function fetchComments(catId: string): Promise<Comment[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("comments")
    .select(
      `
      *,
      profiles (
        name
      )
    `
    )
    .eq("cat_id", catId)
    .eq("is_deleted", false)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching comments:", error);
    return [];
  }

  return data as Comment[];
}
