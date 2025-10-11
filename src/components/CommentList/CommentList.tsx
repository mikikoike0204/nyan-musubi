// src/components/CommentList/CommentList.tsx
import type { Comment } from "@/types/comment";
import CommentItem from "@/components/CommentItem/CommentItem";
import "./style.css";

interface Props {
  comments: Comment[];
  catPostUserId: string;
}

export default function CommentList({ comments, catPostUserId }: Props) {
  if (comments.length === 0) {
    return (
      <div className="p-detail-comment__empty">
        まだコメントはありません。最初のコメントや質問をしてみましょう！
      </div>
    );
  }

  return (
    <ul className="p-detail-comment__list">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          catPostUserId={catPostUserId}
        />
      ))}
    </ul>
  );
}
