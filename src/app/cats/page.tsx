"use client";

import React, { useEffect, useState } from "react";
import CatSearch from "@/components/CatSearch/CatSearch";
import Select from "@/components/Select/Select";
import CatList from "@/components/CatList/CatList";
import { Cat } from "@/types/cat";
import { createClient } from "@supabase/supabase-js";
import "./style.css";
import Image from "next/image";

// Supabaseクライアントの初期化
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface CatsProps {
  limit: number; // 表示件数の制限
  showAdopted?: boolean; // 譲渡済みの猫を表示するかどうか
}

// 年齢を表示用に変換する関数（そのまま表示）
const getAgeDisplay = (age: Cat["age"]): string => {
  return age;
};

// 性別を表示用に変換する関数
const getGenderDisplay = (gender: Cat["gender"]): string => {
  switch (gender) {
    case "オス":
      return "♂";
    case "メス":
      return "♀";
    case "不明":
      return "？";
    default:
      return gender;
  }
};

interface CatsProps {
  limit: number; // 表示件数の制限
  showAdopted?: boolean; // 譲渡済みの猫を表示するかどうか
}

export default function Cats({ limit, showAdopted }: CatsProps) {
  const [cats, setCats] = useState<Cat[]>([]);
  const [filteredCats, setFilteredCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCats();
  }, [limit, showAdopted]);

  const fetchCats = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("cat_adoption_info")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);

      // adopted=false 固定
      query = query.eq("adopted", false);

      if (showAdopted === false) {
        query = query.eq("adopted", false);
      } else if (showAdopted === true) {
        query = query.eq("adopted", true);
      }

      const { data, error } = await query;
      if (error) throw error;

      setCats(data || []);
      setFilteredCats(data || []); // 初期は全件表示
    } catch (error) {
      console.error("Error fetching cats:", error);
      setError("猫の情報を取得できませんでした。");
    } finally {
      setLoading(false);
    }
  };

  // 検索条件に基づいてフィルタリング
  const handleSearch = (filters: any) => {
    let result = cats;

    if (filters.prefecture) {
      result = result.filter((cat) => cat.prefecture === filters.prefecture);
    }
    if (filters.color && filters.color.length > 0) {
      result = result.filter((cat) => filters.color.includes(cat.color));
    }
    if (filters.age) {
      result = result.filter((cat) => cat.age === filters.age);
    }
    if (filters.gender) {
      result = result.filter((cat) => cat.gender === filters.gender);
    }
    if (filters.vaccinated !== undefined) {
      result = result.filter(
        (cat) => String(cat.vaccinated) === filters.vaccinated
      );
    }
    if (filters.neutered !== undefined) {
      result = result.filter(
        (cat) => String(cat.neutered) === filters.neutered
      );
    }
    if (filters.single_ok !== undefined) {
      result = result.filter(
        (cat) => String(cat.single_ok) === filters.single_ok
      );
    }
    if (filters.elderly_ok !== undefined) {
      result = result.filter(
        (cat) => String(cat.elderly_ok) === filters.elderly_ok
      );
    }

    setFilteredCats(result);
  };

  // ローディング表示
  if (loading) {
    return (
      <div className="p-top-newcat__loading">
        <p>読み込み中...</p>
      </div>
    );
  }

  // エラー表示
  if (error) {
    return (
      <div className="p-top-newcat__error">
        <p>{error}</p>
        <button onClick={fetchCats} className="c-common-btn">
          再試行
        </button>
      </div>
    );
  }

  // データが空の場合
  if (filteredCats.length === 0) {
    return (
      <div className="p-top-newcat__empty">
        <p>条件に合う猫が見つかりませんでした。</p>
      </div>
    );
  }

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
            <h1 className="p-sub-mv__title">
              家族を探している
              <br />
              ねこちゃん一覧
            </h1>
          </div>
        </div>
      </section>

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
          <CatList limit={8} cats={filteredCats} />

          <div className="c-pagination table ml-auto mr-auto mt-15">
            <ol className="c-pagination__list flex justify-center items-center gap-x-3">
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
              <li className="c-pagination__item current border w-10 h-10 flex direction-col justify-center items-center">
                1
              </li>
              <li className="c-pagination__item w-10 h-10">
                <a
                  className="c-pagination__link flex direction-col justify-center items-center w-10 h-10 bg-gray-300"
                  href=""
                >
                  2
                </a>
              </li>
              <li className="c-pagination__item w-10 h-10">
                <a
                  className="c-pagination__link flex direction-col justify-center items-center w-10 h-10 bg-gray-300"
                  href=""
                >
                  3
                </a>
              </li>
              <li className="c-pagination__item w-10 h-10">
                <a
                  className="c-pagination__link flex direction-col justify-center items-center w-10 h-10 bg-gray-300"
                  href=""
                >
                  4
                </a>
              </li>
              <li className="c-pagination__item w-10 h-10">
                <a
                  className="c-pagination__link flex direction-col justify-center items-center w-10 h-10 bg-gray-300"
                  href=""
                >
                  5
                </a>
              </li>
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
