// src/components/EditButton/EditButton.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

interface EditButtonProps {
  catId: string;
  postUserId: string;
  editPath?: string; // 編集ページのパスをカスタマイズ可能に
}

export default function EditButton({
  catId,
  postUserId,
  editPath,
}: EditButtonProps) {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // デフォルトは /cats/[id]/edit
  const defaultEditPath = `/cats/${catId}/edit`;
  const finalEditPath = editPath || defaultEditPath;

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setCurrentUserId(session.user.id);
      }
      setLoading(false);
    };

    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setCurrentUserId(session?.user?.id || null);
        setLoading(false);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // ローディング中は何も表示しない
  if (loading) {
    return null;
  }

  // 投稿者本人の場合は編集ボタン
  if (currentUserId && currentUserId === postUserId) {
    return (
      <Link href={finalEditPath}>
        <button className="c-common-btn">編集する</button>
      </Link>
    );
  }

  // それ以外は応募ボタン
  return (
    <button className="c-common-btn" type="button">
      問い合わせる
    </button>
  );
}
