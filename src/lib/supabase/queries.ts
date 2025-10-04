// src/lib/supabase/queries.ts
import { createClient } from "@/utils/supabase/server";

export async function getMyPosts() {
  const supabase = await createClient();

  // 現在のユーザーを取得
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return [];
  }

  const { data, error } = await supabase
    .from("cat_adoption_info")
    .select(
      `
      id,
      prefecture,
      color,
      age,
      gender,
      adopted,
      thumbnail,
      created_at,
      cat_images (
        image_url,
        order
      )
    `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  return data || [];
}
