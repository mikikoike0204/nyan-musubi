// src/actions/commentActions.ts
"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createCommentAction(catId: string, content: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "ログインが必要です" };
  }

  const { data, error } = await supabase
    .from("comments")
    .insert({
      cat_id: catId,
      user_id: user.id,
      content: content,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/cats/${catId}`);
  return { success: true, data };
}

export async function deleteCommentAction(commentId: string, catId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "ログインが必要です" };
  }

  // コメント情報を取得（削除権限チェック用）
  const { data: comment, error: fetchError } = await supabase
    .from("comments")
    .select(
      `
      user_id,
      cat_id,
      cat_adoption_info(user_id)
    `
    )
    .eq("id", commentId)
    .single();

  if (fetchError || !comment) {
    console.error("Comment fetch error:", fetchError);
    return { error: "コメントが見つかりません" };
  }

  // 型アサーションで解決
  const catAdoptionInfo = comment.cat_adoption_info as
    | { user_id: string }[]
    | { user_id: string }
    | null;

  // 削除権限の確認
  const isCommentOwner = comment.user_id === user.id;

  // 配列か単一オブジェクトかを判定
  let catPostUserId: string | undefined;
  if (Array.isArray(catAdoptionInfo)) {
    catPostUserId = catAdoptionInfo[0]?.user_id;
  } else if (catAdoptionInfo) {
    catPostUserId = catAdoptionInfo.user_id;
  }

  const isCatPostOwner = catPostUserId === user.id;

  if (!isCommentOwner && !isCatPostOwner) {
    return { error: "削除権限がありません" };
  }

  // 論理削除を実行
  const { error: deleteError } = await supabase
    .from("comments")
    .update({ is_deleted: true })
    .eq("id", commentId);

  if (deleteError) {
    console.error("Delete error:", deleteError);
    return { error: deleteError.message };
  }

  revalidatePath(`/cats/${catId}`);
  return { success: true };
}
