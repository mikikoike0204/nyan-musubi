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

export async function getFavorites() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return [];
  }

  const { data, error } = await supabase
    .from("favorites")
    .select(
      `
      id,
      cat_id,
      cat_adoption_info!inner (
        id,
        prefecture,
        color,
        age,
        gender,
        adopted,
        thumbnail_url,
        title
      )
    `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }

  return (data || []).map((item) => ({
    ...item,
    cat_adoption_info: Array.isArray(item.cat_adoption_info)
      ? item.cat_adoption_info[0]
      : item.cat_adoption_info,
  }));
}

export async function checkFavorite(catId: string) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return false;
  }

  const { data, error } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("cat_id", catId)
    .single();

  return !error && !!data;
}
