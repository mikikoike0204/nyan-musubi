// src/app/adopted/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import CatSearch from "@/components/CatSearch/CatSearch";
import Select from "@/components/Select/Select";
import CatList from "@/components/CatList/CatList";
import { Cat } from "@/types/cat";
import { createBrowserClient } from "@supabase/ssr";
import Pagination from "@/components/Pagination/Pagination";
import styles from "./page.module.css";

// Supabaseクライアントの初期化
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ITEMS_PER_PAGE = 8; // 1ページあたりの表示件数

export default function AdoptedCats() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [filteredCats, setFilteredCats] = useState<Cat[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetchCats();
  }, []);

  // 現在のページに表示するデータを計算
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    let sortedCats = [...filteredCats];

    // ソート処理
    if (sortOrder === "asc") {
      sortedCats.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    } else if (sortOrder === "desc") {
      sortedCats.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sortOrder === "updated") {
      sortedCats.sort(
        (a, b) =>
          new Date(b.updated_at || b.created_at).getTime() -
          new Date(a.updated_at || a.created_at).getTime()
      );
    }

    return sortedCats.slice(startIndex, endIndex);
  };

  // 総ページ数を計算
  const totalPages = Math.ceil(filteredCats.length / ITEMS_PER_PAGE);

  // データ取得（譲渡済みのみ取得）
  const fetchCats = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("cat_adoption_info")
        .select("*")
        .order("created_at", { ascending: false })
        .eq("adopted", true); // 譲渡済みのねこのみ取得

      if (error) throw error;

      setCats(data || []);
      setFilteredCats(data || []);
    } catch (err) {
      console.error("Error fetching adopted cats:", err);
      setError("譲渡済みのねこの情報を取得できませんでした。");
    } finally {
      setLoading(false);
    }
  };

  // フィルタリング
  const handleSearch = (filters: any) => {
    let result = cats;

    // 都道府県でフィルタリング
    if (filters.prefecture) {
      result = result.filter((c) => c.prefecture === filters.prefecture);
    }

    // 毛色でフィルタリング
    if (filters.color && filters.color.length > 0) {
      result = result.filter((c) => filters.color.includes(c.color));
    }

    // 年齢でフィルタリング
    if (filters.age) {
      result = result.filter((c) => c.age === filters.age);
    }

    // 性別でフィルタリング
    if (filters.gender) {
      result = result.filter((c) => c.gender === filters.gender);
    }

    // ワクチン接種状況でフィルタリング
    if (filters.vaccinated !== undefined) {
      result = result.filter((c) => c.vaccinated === filters.vaccinated);
    }

    // 避妊・去勢でフィルタリング
    if (filters.neutered !== undefined) {
      result = result.filter((c) => c.neutered === filters.neutered);
    }

    // 単身者応募でフィルタリング
    if (filters.single_ok !== undefined) {
      result = result.filter((c) => c.single_ok === filters.single_ok);
    }

    // 高齢者応募でフィルタリング
    if (filters.elderly_ok !== undefined) {
      result = result.filter((c) => c.elderly_ok === filters.elderly_ok);
    }

    setFilteredCats(result);
    setCurrentPage(1); // 検索時は1ページ目に戻る
  };

  // ソート変更ハンドラ
  const handleSortChange = (value: string) => {
    setSortOrder(value);
    setCurrentPage(1); // ソート変更時は1ページ目に戻る
  };

  // ページ変更ハンドラ
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // ページトップにスクロール
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ローディング
  if (loading) return <p className="c-loading">読み込み中...</p>;

  // エラー
  if (error)
    return (
      <div className="p-top-newcat__error">
        <p>{error}</p>
        <button onClick={fetchCats} className="c-common-btn">
          再試行
        </button>
      </div>
    );

  const currentPageData = getCurrentPageData();

  return (
    <div className="c-section-wrapper">
      {/* メインビジュアル */}
      <section className="p-sub-mv">
        <div className="c-container">
          <div className="p-sub-mv__content">
            <div
              className="p-sub-mv__image"
              style={{ backgroundImage: "url('/adopted/bg-mv.jpg')" }}
            ></div>
            <div className={styles.subMvBg}></div>
            <h1 className="p-sub-mv__title">
              家族が決まった
              <br />
              ねこちゃん一覧
            </h1>
          </div>
        </div>
      </section>

      {/* 絞り込み条件 */}
      <section className={`c-section ${styles.parameters}`}>
        <div className="c-container">
          <div className="c-section-title-wrap">
            <h2 className="c-section-title">絞り込み条件</h2>
          </div>
          <div className="p-cats-parameters__content">
            <CatSearch onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* ねこ一覧 */}
      <section className="c-section">
        <div className="c-container">
          {/* データなしの場合のメッセージ */}
          {filteredCats.length === 0 ? (
            <div>
              {cats.length === 0 ? (
                <p className="c-loading">現在、譲渡済みのねこはいません。</p>
              ) : (
                <>
                  <p className="c-loading">
                    条件に合うねこが見つかりませんでした。
                    <br />
                    検索条件を変更してお試しください。
                  </p>
                </>
              )}
            </div>
          ) : (
            <>
              <div className={styles.listInfo}>
                <div>
                  <p>
                    検索結果: {filteredCats.length}件 / 全{cats.length}件
                    {totalPages > 1 && (
                      <span>
                        {" "}
                        (ページ: {currentPage}/{totalPages})
                      </span>
                    )}
                  </p>
                </div>
                <div className={styles.listSort}>
                  <Select
                    name="sort"
                    value={sortOrder}
                    options={[
                      { value: "desc", label: "登録が新しい順" },
                      { value: "asc", label: "登録が古い順" },
                      { value: "updated", label: "情報の更新順" },
                    ]}
                    onChange={handleSortChange}
                  />
                </div>
              </div>
              <CatList
                limit={ITEMS_PER_PAGE}
                cats={currentPageData}
                showAdopted={true}
              />
            </>
          )}

          {/* ページネーション */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </section>
    </div>
  );
}
