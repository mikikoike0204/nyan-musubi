// src/app/mypage/page.tsx
import CatList from "@/components/CatList/CatList";
import MyPosts from "@/components/MyPosts/MyPosts";
import Link from "next/link";
import { Suspense } from "react";
import FavoriteCats from "@/components/FavoriteCats/FavoriteCats";
import "./style.css";

export default function Mypage() {
  return (
    <div className="c-section-wrapper">
      <section className="p-sub-mv">
        <div className="c-container">
          <div className="p-sub-mv__content">
            <div
              className="p-sub-mv__image"
              style={{ backgroundImage: "url('/favorites/bg-mv.jpg')" }}
            ></div>
            <div className="p-sub-mv__bg"></div>
            <h1 className="p-sub-mv__title">マイページ</h1>
          </div>
        </div>
      </section>

      <section className="c-section p-myposts">
        <div className="c-container">
          <div className="c-section-title-wrap">
            <h2 className="c-section-title">自分の投稿</h2>
          </div>
          <Suspense fallback={<p>読み込み中...</p>}>
            <MyPosts />
          </Suspense>
        </div>
      </section>

      <section className="c-section p-favorites-list">
        <div className="c-container">
          <div className="c-section-title-wrap">
            <h2 className="c-section-title">お気に入りのねこちゃん</h2>
          </div>
          <Suspense fallback={<p>読み込み中...</p>}>
            <FavoriteCats limit={4} showPagination={false} />
          </Suspense>

          <div className="p-top-newcat__more">
            <Link href="/favorites" className="c-common-btn">
              もっと見る
            </Link>
          </div>
          <div className="p-top-newcat__more">
            <Link href="/" className="c-common-btn2">
              TOPページに戻る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
