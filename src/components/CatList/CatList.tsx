// src/components/CatList/CatList.tsx
"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Cat } from "@/types/cat";
import CatListItem from "@/components/CatListItem/CatListItem";
import styles from "./CatList.module.css";

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

  // propsCatsが更新された時に、stateを更新
  useEffect(() => {
    if (propsCats) {
      setCats(propsCats);
      setLoading(false);
    }
  }, [propsCats]);

  // propsCatsが提供されていない場合のみ、データを取得
  useEffect(() => {
    if (!propsCats) {
      fetchCats();
    }
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
      setError("ねこの情報を取得できませんでした。");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="c-loading">読み込み中...</p>;
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
    return <p className="c-loading">現在、登録されているねこはいません。</p>;
  }

  return (
    <ul className={styles.topNewcatList}>
      {cats.map((cat) => (
        <CatListItem key={cat.id} cat={cat} />
      ))}
    </ul>
  );
}
