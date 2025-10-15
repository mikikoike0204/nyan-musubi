// src/components/MyPosts/MyPosts.tsx
import { getMyPosts } from "@/lib/supabase/queries";
import Link from "next/link";
import Image from "next/image";
import styles from "./myPosts.module.css";

export default async function MyPosts() {
  const posts = await getMyPosts();

  if (posts.length === 0) {
    return (
      <>
        <p className="c-loading">まだ投稿がありません</p>
        <Link href="/cats/new" className="c-common-btn">
          新しく投稿する
        </Link>
      </>
    );
  }

  return (
    <ul className={styles.myPostsList}>
      {posts.map((post) => {
        const href = post.adopted ? `/adopted/${post.id}` : `/cats/${post.id}`;

        return (
          <li key={post.id} className={styles.myPostsItem}>
            <Link href={href}>
              {post.thumbnail && (
                <div className={styles.myPostsImage}>
                  <Image
                    src={post.thumbnail}
                    alt="ねこの画像"
                    fill
                    sizes="200px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
              <div className={styles.myPostsInfo}>
                <p className={styles.myPostsDetails}>
                  {post.prefecture} / {post.color} / {post.age} / {post.gender}
                </p>
                <p className={styles.myPostsDate}>
                  投稿日:{" "}
                  {new Date(post.created_at).toLocaleDateString("ja-JP")}
                </p>
                <p className={styles.myPostsBadge}>
                  ステータス：{post.adopted ? "譲渡済み" : "募集中"}
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
