// src/components/CommentList/CommentList.tsx
import type { Comment } from "@/types/comment";
import CommentItem from "@/components/CommentItem/CommentItem";
import styles from "./CommentList.module.css";

interface Props {
  comments: Comment[];
  catPostUserId: string;
}

export default function CommentList({ comments, catPostUserId }: Props) {
  if (comments.length === 0) {
    return (
      <div className="c-loading">
        まだコメントはありません。最初のコメントや質問をしてみましょう！
      </div>
    );
  }

  return (
    <ul className={styles.commentList}>
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
