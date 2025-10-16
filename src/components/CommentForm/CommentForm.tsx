// src/components/CommentForm/CommentForm.tsx
"use client";

import { useState, useEffect } from "react";
import { createCommentAction } from "@/actions/commentActions";
import { supabase } from "@/lib/supabaseClient";
import styles from "./CommentForm.module.css";

interface Props {
  catId: string;
}

export default function CommentForm({ catId }: Props) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };
    checkAuth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("コメントや質問内容を入力してください");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createCommentAction(catId, content);

      if (result.error) {
        alert(result.error);
      } else {
        setContent("");
      }
    } catch (error) {
      console.error("投稿に失敗しました", error);
      alert("投稿に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="c-loading">コメント・質問するにはログインが必要です</div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.commentForm}>
      <div className={styles.commentFormInner}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="コメントや質問内容を入力してください"
          className={styles.commentFormTextarea}
          rows={4}
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className={styles.commentFormSubmit}
        >
          {isSubmitting ? "投稿中..." : "投稿する"}
        </button>
      </div>
    </form>
  );
}
