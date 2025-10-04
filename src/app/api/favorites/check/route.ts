// src/app/api/favorites/check/route.ts
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ isFavorite: false });
  }

  const { cat_id } = await request.json();

  const { data, error } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("cat_id", cat_id)
    .single();

  return NextResponse.json({ isFavorite: !error && !!data });
}
