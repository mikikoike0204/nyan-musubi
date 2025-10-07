"use client";

import React, { useEffect, useState } from "react";
import CatList from "@/components/CatList/CatList";
import { Cat } from "@/types/cat";
import { supabase } from "@/lib/supabaseClient";
import Pagination from "@/components/Pagination/Pagination";

interface FavoriteCatsProps {
  /** 表示件数の上限（例：マイページは4件） */
  limit?: number;
  /** ページネーションを表示するか */
  showPagination?: boolean;
}

export default function FavoriteCats({
  limit,
  showPagination = true,
}: FavoriteCatsProps) {
  const [favoriteCats, setFavoriteCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // ページあたり件数を limit から自動調整
  const ITEMS_PER_PAGE = limit || 8;
  const totalPages = Math.ceil(favoriteCats.length / ITEMS_PER_PAGE);

  useEffect(() => {
    fetchFavoriteCats();
  }, []);

  const fetchFavoriteCats = async () => {
    try {
      setLoading(true);
      setError(null);

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        setError("ログインが必要です。");
        setLoading(false);
        return;
      }

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

      const cats: Cat[] =
        data
          ?.map((item) => {
            const catInfo = Array.isArray(item.cat_adoption_info)
              ? item.cat_adoption_info[0]
              : item.cat_adoption_info;
            if (!catInfo) return null;
            return { ...catInfo, sliderImages: [] as string[] };
          })
          .filter((cat): cat is Cat => cat !== null) || [];

      // limitが指定されていてページネーションを表示しない場合のみカット
      setFavoriteCats(showPagination ? cats : cats.slice(0, limit));
    } catch (err) {
      console.error("Error fetching favorite cats:", err);
      setError("お気に入りのねこ情報を取得できませんでした。");
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

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>{error}</p>;
  if (favoriteCats.length === 0)
    return <p>お気に入りに追加されたねこちゃんはまだいません。</p>;

  const currentCats = showPagination ? getCurrentPageData() : favoriteCats;

  return (
    <div className="p-favoritecats">
      {/* 件数表示 */}
      <div className="p-favorites__display">
        お気に入り件数: {favoriteCats.length}件
        {showPagination && totalPages > 1 && (
          <span>
            {" "}
            (ページ: {currentPage}/{totalPages})
          </span>
        )}
      </div>

      {/* ねこリスト */}
      <CatList limit={ITEMS_PER_PAGE} cats={currentCats} />

      {/* ページネーション */}
      {showPagination && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
