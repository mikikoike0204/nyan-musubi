// src/components/CatList/CatList.tsx
"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Cat } from "@/types/cat";
import CatListItem from "@/components/CatListItem/CatListItem";
import "./style.css";

// 年齢を表示用に変換する関数（そのまま表示）
const getAgeDisplay = (age: Cat["age"]): string => age;

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

interface CatListProps {
  limit: number;
  showAdopted?: boolean;
  cats?: Cat[];
}

export default function CatList({
  limit,
  showAdopted,
  cats: propsCats,
}: CatListProps) {
  const [cats, setCats] = useState<Cat[]>(propsCats || []);
  const [loading, setLoading] = useState(!propsCats);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!propsCats) {
      fetchCats();
    }
  }, [limit, showAdopted, propsCats]);

  const fetchCats = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("cat_adoption_info")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);

      if (showAdopted === false) {
        query = query.eq("adopted", false);
      } else if (showAdopted === true) {
        query = query.eq("adopted", true);
      }

      const { data, error } = await query;
      if (error) throw error;

      setCats(data || []);
    } catch (error) {
      console.error("Error fetching cats:", error);
      setError("猫の情報を取得できませんでした。");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-top-newcat__loading">
        <p>読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-top-newcat__error">
        <p>{error}</p>
        {!propsCats && <button onClick={fetchCats}>再試行</button>}
      </div>
    );
  }

  if (cats.length === 0) {
    return (
      <div className="p-top-newcat__empty">
        <p>現在、登録されている猫はいません。</p>
      </div>
    );
  }

  return (
    <ul className="p-top-newcat__list">
      {cats.map((cat) => (
        <CatListItem key={cat.id} cat={cat} />
      ))}
    </ul>
  );
}
