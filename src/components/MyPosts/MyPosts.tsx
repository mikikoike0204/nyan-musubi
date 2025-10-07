// src/components/MyPosts/MyPosts.tsx
import { getMyPosts } from "@/lib/supabase/queries";
import Link from "next/link";
import Image from "next/image";
import "./style.css";

export default async function MyPosts() {
  const posts = await getMyPosts();

  if (posts.length === 0) {
    return (
      <div className="p-myposts__empty">
        <p>まだ投稿がありません</p>
        <Link href="/cats/new" className="c-common-btn">
          新しく投稿する
        </Link>
      </div>
    );
  }

  return (
    <ul className="p-myposts__list">
      {posts.map((post) => {
        const href = post.adopted ? `/adopted/${post.id}` : `/cats/${post.id}`;

        return (
          <li key={post.id} className="p-myposts__item">
            <Link href={href}>
              {post.thumbnail && (
                <div className="p-myposts__image">
                  <Image
                    src={post.thumbnail}
                    alt="ねこの画像"
                    fill
                    sizes="200px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
              <div className="p-myposts__info">
                <p className="p-myposts__details">
                  {post.prefecture} / {post.color} / {post.age} / {post.gender}
                </p>
                <p className="p-myposts__date">
                  投稿日:{" "}
                  {new Date(post.created_at).toLocaleDateString("ja-JP")}
                </p>
                <p className="p-myposts__badge">
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
