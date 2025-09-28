// src/app/cats/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import CatSearch from "@/components/CatSearch/CatSearch";
import Select from "@/components/Select/Select";
import CatList from "@/components/CatList/CatList";
import { Cat } from "@/types/cat";
import { createBrowserClient } from "@supabase/ssr";
import "./style.css";
import Image from "next/image";

// Supabaseクライアントの初期化
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Cats() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [filteredCats, setFilteredCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCats();
  }, []);

  // データ取得（最新8件、譲渡済みは除外）
  const fetchCats = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("cat_adoption_info")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(8)
        .eq("adopted", false);

      if (error) throw error;

      console.log("取得したデータ:", data); // デバッグ用
      setCats(data || []);
      setFilteredCats(data || []);
    } catch (err) {
      console.error("Error fetching cats:", err);
      setError("猫の情報を取得できませんでした。");
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

    // ワクチン接種状況でフィルタリング（修正）
    if (filters.vaccinated !== undefined) {
      result = result.filter((c) => c.vaccinated === filters.vaccinated);
    }

    // 避妊・去勢でフィルタリング（修正）
    if (filters.neutered !== undefined) {
      result = result.filter((c) => c.neutered === filters.neutered);
    }

    // 単身者応募でフィルタリング（修正）
    if (filters.single_ok !== undefined) {
      result = result.filter((c) => c.single_ok === filters.single_ok);
    }

    // 高齢者応募でフィルタリング（修正）
    if (filters.elderly_ok !== undefined) {
      result = result.filter((c) => c.elderly_ok === filters.elderly_ok);
    }

    console.log("最終結果数:", result.length); // デバッグ用
    setFilteredCats(result);
  };

  // ローディング
  if (loading)
    return (
      <div className="p-top-newcat__loading">
        <p>読み込み中...</p>
      </div>
    );

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

  return (
    <div className="c-section-wrapper">
      {/* メインビジュアル */}
      <section className="p-sub-mv">
        <div className="c-container">
          <div className="p-sub-mv__content">
            <div
              className="p-sub-mv__image"
              style={{ backgroundImage: "url('/favorites/bg-mv.jpg')" }}
            ></div>
            <div className="p-sub-mv__bg"></div>
            <h1 className="p-sub-mv__title">
              家族を探している
              <br />
              ねこちゃん一覧
            </h1>
          </div>
        </div>
      </section>

      {/* 絞り込み条件 */}
      <section className="c-section p-cats-parameters">
        <div className="c-container">
          <div className="c-section-title-wrap">
            <h2 className="c-section-title">絞り込み条件</h2>
          </div>
          <div className="p-cats-parameters__content">
            <CatSearch onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* 猫一覧 */}
      <section className="c-section p-cats-list">
        <div className="c-container">
          <div className="p-cats-list__sort">
            <Select
              name="sort"
              options={[
                { value: "desc", label: "登録が新しい順" },
                { value: "asc", label: "登録が古い順" },
                { value: "updated", label: "情報の更新順" },
              ]}
            />
          </div>

          {/* データなしの場合のメッセージ */}
          {filteredCats.length === 0 ? (
            <div className="p-top-newcat__empty">
              <p>条件に合う猫が見つかりませんでした。</p>
              <p>検索条件を変更してお試しください。</p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <p>
                  検索結果: {filteredCats.length}件 / 全{cats.length}件
                </p>
              </div>
              <CatList limit={8} cats={filteredCats} />
            </>
          )}

          {/* ページネーション（表示のみ、機能は未実装） */}
          <div className="c-pagination table ml-auto mr-auto mt-15">
            <ol className="c-pagination__list flex justify-center items-center gap-x-3">
              {/* 前ページ */}
              <li className="c-pagination__item w-10 h-20">
                <a
                  className="c-pagination__link flex direction-col justify-center items-center arrow prev-arrow w-full h-full"
                  href=""
                >
                  <Image
                    src="/common/icon-prev-arrow.svg"
                    alt=""
                    width={20}
                    height={15}
                    className="c-pagination__arrow"
                  />
                </a>
              </li>
              {/* ページ番号 */}
              {[1, 2, 3, 4, 5].map((n) => (
                <li
                  key={n}
                  className={`c-pagination__item ${
                    n === 1 ? "current" : ""
                  } w-10 h-10 flex justify-center items-center`}
                >
                  <a
                    className="c-pagination__link flex justify-center items-center w-10 h-10 bg-gray-300"
                    href=""
                  >
                    {n}
                  </a>
                </li>
              ))}
              {/* 次ページ */}
              <li className="c-pagination__item w-10 h-10">
                <a
                  className="c-pagination__link flex direction-col justify-center items-center arrow next-arrow w-10 h-10"
                  href=""
                >
                  <Image
                    src="/common/icon-next-arrow.svg"
                    alt=""
                    width={20}
                    height={15}
                    className="c-pagination__arrow"
                  />
                </a>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
