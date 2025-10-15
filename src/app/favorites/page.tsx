// src/app/favorites/page.tsx
"use client";

import FavoriteCats from "@/components/FavoriteCats/FavoriteCats";
import Link from "next/link";
import styles from "./page.module.css";

export default function FavoritesPage() {
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
            <h1 className="p-sub-mv__title">お気に入りのねこちゃん</h1>
          </div>
        </div>
      </section>

      <section className={`c-section ${styles.favoriteList}`}>
        <div className="c-container">
          <div className="c-section-title-wrap">
            <h2 className="c-section-title">お気に入り一覧</h2>
          </div>
          <FavoriteCats limit={8} />
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
