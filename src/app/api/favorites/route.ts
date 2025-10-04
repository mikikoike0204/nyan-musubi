// src/app/api/favorites/route.ts
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// お気に入り追加
export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { cat_id } = await request.json();

  if (!cat_id) {
    return NextResponse.json({ error: "cat_id is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("favorites")
    .insert({
      user_id: user.id,
      cat_id: cat_id,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}

// お気に入り削除
export async function DELETE(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { cat_id } = await request.json();

  if (!cat_id) {
    return NextResponse.json({ error: "cat_id is required" }, { status: 400 });
  }

  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", user.id)
    .eq("cat_id", cat_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
