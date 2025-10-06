// src/app/favorites/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import CatList from "@/components/CatList/CatList";
import { Cat } from "@/types/cat";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import Pagination from "@/components/Pagination/Pagination";
import "./style.css";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ITEMS_PER_PAGE = 2; // 1ページあたりの件数

export default function Favorites() {
  const [favoriteCats, setFavoriteCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // 総ページ数
  const totalPages = Math.ceil(favoriteCats.length / ITEMS_PER_PAGE);

  useEffect(() => {
    fetchFavoriteCats();
  }, []);

  const fetchFavoriteCats = async () => {
    try {
      setLoading(true);
      setError(null);

      // 現在のユーザーを取得
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        setError("ログインが必要です。");
        setLoading(false);
        return;
      }

      // favoritesテーブルから猫情報を取得
      const { data, error: fetchError } = await supabase
        .from("favorites")
        .select(
          `
          cat_id,
          cat_adoption_info (
            id,
            user_id,
            title,
            thumbnail,
            prefecture,
            color,
            age,
            gender,
            vaccinated,
            neutered,
            single_ok,
            elderly_ok,
            created_at,
            updated_at,
            description,
            personality,
            health_condition,
            adopted
          )
        `
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;

      // データ整形
      const cats: Cat[] =
        data
          ?.map((item) => {
            const catInfo = Array.isArray(item.cat_adoption_info)
              ? item.cat_adoption_info[0]
              : item.cat_adoption_info;

            if (!catInfo) return null;

            return {
              ...catInfo,
              sliderImages: [] as string[], // ← 型を明示
            };
          })
          .filter((cat): cat is Cat => cat !== null) || [];

      setFavoriteCats(cats);
    } catch (err) {
      console.error("Error fetching favorite cats:", err);
      setError("お気に入りの猫情報を取得できませんでした。");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return favoriteCats.slice(startIndex, endIndex);
  };

  if (loading) {
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
        <section className="c-section p-favorites-list">
          <div className="c-container">
            <p>読み込み中...</p>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
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
        <section className="c-section p-favorites-list">
          <div className="c-container">
            <div className="p-top-newcat__error">
              <p>{error}</p>
              <button onClick={fetchFavoriteCats} className="c-common-btn">
                再試行
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const currentCats = getCurrentPageData();

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

      <section className="c-section p-favorites-list">
        <div className="c-container">
          {favoriteCats.length === 0 ? (
            <div className="p-top-newcat__empty">
              <p>お気に入りに追加された猫ちゃんはまだいません</p>
            </div>
          ) : (
            <>
              <div className="p-favorites__display">
                お気に入り件数: {favoriteCats.length}件
                {totalPages > 1 && (
                  <span>
                    {" "}
                    (ページ: {currentPage}/{totalPages})
                  </span>
                )}
              </div>
              <CatList limit={ITEMS_PER_PAGE} cats={currentCats} />

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}

          <div className="p-top-newcat__more">
            <Link href="/" className="c-common-btn">
              TOPページに戻る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
