// src/components/CatSearch/CatSearch.tsx
"use client";

import React, { useState } from "react";
import Checkbox from "../Checkbox/Checkbox";
import Select from "../Select/Select";
import { Cat } from "@/types/cat";
import { prefectureOptions } from "@/types/prefectures";
import styles from "./CatSearch.module.css";

// Cat型から毛色の選択肢を生成
const colorOptions = [
  "白系",
  "黒系",
  "茶系",
  "グレー系",
  "サビ",
  "茶白",
  "白黒",
  "茶トラ",
  "キジトラ",
  "サバトラ",
  "その他",
] as const;

// Cat型から年齢の選択肢を生成
const ageOptions: { value: Cat["age"] | ""; label: string }[] = [
  { value: "幼少期", label: "幼少期" },
  { value: "若年期", label: "若年期" },
  { value: "高齢期", label: "高齢期" },
];

// Cat型から性別の選択肢を生成
const genderOptions: { value: Cat["gender"] | ""; label: string }[] = [
  { value: "オス", label: "オス" },
  { value: "メス", label: "メス" },
  { value: "不明", label: "不明" },
];

interface CatSearchProps {
  onSearch: (filters: any) => void;
}

export default function CatSearch({ onSearch }: CatSearchProps) {
  const [filters, setFilters] = useState({
    color: [] as string[],
    prefecture: "",
    age: "",
    gender: "",
    vaccinated: "",
    neutered: "",
    single_ok: "",
    elderly_ok: "",
  });

  // 入力変更ハンドラ
  const handleChange = (name: string, value: any) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 空文字列やundefinedを除去し、boolean値を適切に変換
    const cleanedFilters: any = {};

    // 都道府県
    if (filters.prefecture && filters.prefecture !== "") {
      cleanedFilters.prefecture = filters.prefecture;
    }

    // 毛色（配列で複数選択可能）
    if (filters.color.length > 0) {
      cleanedFilters.color = filters.color;
    }

    // 年齢
    if (filters.age && filters.age !== "") {
      cleanedFilters.age = filters.age;
    }

    // 性別
    if (filters.gender && filters.gender !== "") {
      cleanedFilters.gender = filters.gender;
    }

    // ワクチン接種状況
    if (filters.vaccinated && filters.vaccinated !== "") {
      cleanedFilters.vaccinated = filters.vaccinated === "true";
    }

    // 避妊・去勢
    if (filters.neutered && filters.neutered !== "") {
      cleanedFilters.neutered = filters.neutered === "true";
    }

    // 単身者応募
    if (filters.single_ok && filters.single_ok !== "") {
      cleanedFilters.single_ok = filters.single_ok === "true";
    }

    // 高齢者応募
    if (filters.elderly_ok && filters.elderly_ok !== "") {
      cleanedFilters.elderly_ok = filters.elderly_ok === "true";
    }

    console.log("送信するcleanedFilters:", cleanedFilters);
    onSearch(cleanedFilters);
  };

  // リセット機能
  const handleReset = () => {
    const resetFilters = {
      color: [],
      prefecture: "",
      age: "",
      gender: "",
      vaccinated: "",
      neutered: "",
      single_ok: "",
      elderly_ok: "",
    };
    setFilters(resetFilters);
    onSearch({}); // 空のオブジェクトを渡してすべて表示
  };

  return (
    <form className={styles.catSearchParametersForm} onSubmit={handleSubmit}>
      <ul className={styles.catSearchParameters}>
        {/* 毛色 */}
        <li className={styles.catSearchItem}>
          <div className={styles.catSearchLabel}>毛色</div>
          <div className={styles.catSearchInputs}>
            {colorOptions.map((color) => (
              <Checkbox
                key={color}
                label={color}
                name="color"
                checked={filters.color.includes(color)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  const newColors = checked
                    ? [...filters.color, color]
                    : filters.color.filter((c: string) => c !== color);

                  handleChange("color", newColors);
                }}
              />
            ))}
          </div>
        </li>

        {/* 募集地域 */}
        <li className={`${styles.catSearchItem} ${styles.catSearchItemHalf}`}>
          <div className={styles.catSearchLabel}>募集地域</div>
          <Select
            name="prefecture"
            value={filters.prefecture}
            options={[...prefectureOptions]}
            onChange={(value) => handleChange("prefecture", value)}
          />
        </li>

        {/* 年齢 */}
        <li className={`${styles.catSearchItem} ${styles.catSearchItemHalf}`}>
          <div className={styles.catSearchLabel}>年齢</div>
          <Select
            name="age"
            value={filters.age}
            options={ageOptions}
            onChange={(value) => handleChange("age", value)}
          />
        </li>

        {/* 性別 */}
        <li className={`${styles.catSearchItem} ${styles.catSearchItemHalf}`}>
          <div className={styles.catSearchLabel}>性別</div>
          <Select
            name="gender"
            value={filters.gender}
            options={genderOptions}
            onChange={(value) => handleChange("gender", value)}
          />
        </li>

        {/* ワクチン接種状況 */}
        <li className={`${styles.catSearchItem} ${styles.catSearchItemHalf}`}>
          <div className={styles.catSearchLabel}>ワクチン接種状況</div>
          <Select
            name="vaccinated"
            value={filters.vaccinated}
            options={[
              { value: "true", label: "済み" },
              { value: "false", label: "未" },
            ]}
            onChange={(value) => handleChange("vaccinated", value)}
          />
        </li>

        {/* 避妊・去勢 */}
        <li className={`${styles.catSearchItem} ${styles.catSearchItemHalf}`}>
          <div className={styles.catSearchLabel}>避妊・去勢</div>
          <Select
            name="neutered"
            value={filters.neutered}
            options={[
              { value: "true", label: "済み" },
              { value: "false", label: "未" },
            ]}
            onChange={(value) => handleChange("neutered", value)}
          />
        </li>

        {/* 単身者応募 */}
        <li className={`${styles.catSearchItem} ${styles.catSearchItemHalf}`}>
          <div className={styles.catSearchLabel}>単身者応募</div>
          <Select
            name="single_ok"
            value={filters.single_ok}
            options={[
              { value: "true", label: "可" },
              { value: "false", label: "不可" },
            ]}
            onChange={(value) => handleChange("single_ok", value)}
          />
        </li>

        {/* 高齢者応募 */}
        <li className={`${styles.catSearchItem} ${styles.catSearchItemHalf}`}>
          <div className={styles.catSearchLabel}>高齢者応募</div>
          <Select
            name="elderly_ok"
            value={filters.elderly_ok}
            options={[
              { value: "true", label: "可" },
              { value: "false", label: "不可" },
            ]}
            onChange={(value) => handleChange("elderly_ok", value)}
          />
        </li>
      </ul>

      <div className={styles.more}>
        <button type="submit" className="c-common-btn">
          検索する
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="c-common-btn c-common-btn--secondary"
        >
          リセット
        </button>
      </div>
    </form>
  );
}
