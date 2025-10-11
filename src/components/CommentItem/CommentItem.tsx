// src/components/CommentItem/CommentItem.tsx
"use client";

import type { Comment } from "@/types/comment";
import { useState, useEffect } from "react";
import { deleteCommentAction } from "@/actions/commentActions";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import "./style.css";

interface Props {
  comment: Comment;
  catPostUserId: string;
}

export default function CommentItem({ comment, catPostUserId }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUserId = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    };
    getUserId();
  }, [comment.user_id, catPostUserId]);

  const handleDelete = async () => {
    if (!confirm("この質問を削除しますか？")) return;

    setIsDeleting(true);
    try {
      const result = await deleteCommentAction(comment.id, comment.cat_id);

      if (result.error) {
        alert(result.error);
      } else {
        console.log("削除成功");
      }
    } catch (error) {
      console.error("削除に失敗しました", error);
      alert("削除に失敗しました");
    } finally {
      setIsDeleting(false);
    }
  };

  const canDelete =
    currentUserId === comment.user_id || currentUserId === catPostUserId;

  return (
    <li className="p-detail-comment__list-item">
      <div className="p-detail-comment__item-header">
        <div className="p-detail-comment__item-user">
          <Image
            src="/common/icon-comment.png"
            alt=""
            width={25}
            height={25}
            className="p-detail-comment__item-user-icon"
          />
          <span className="p-detail-comment__item-username">
            {comment.profiles?.name || "匿名ユーザー"}
          </span>
          <time className="p-detail-comment__item-date">
            {new Date(comment.created_at).toLocaleDateString("ja-JP")}
          </time>
        </div>
      </div>
      <div className="p-detail-comment__item-content">{comment.content}</div>
      {canDelete && (
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-detail-comment__item-delete"
        >
          {isDeleting ? "削除中..." : "削除"}
        </button>
      )}
    </li>
  );
}
