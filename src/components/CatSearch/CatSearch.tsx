// src/components/CatSearch/CatSearch.tsx
import React from "react";
import Checkbox from "../Checkbox/Checkbox";
import Select from "../Select/Select";

const hairColors = [
  "白系",
  "黒系",
  "茶系",
  "グレー系",
  "サビ",
  "白茶",
  "白黒",
  "茶トラ",
  "キジトラ",
  "サバトラ",
  "その他",
];

export const prefectures = [
  { value: "hokkaido", label: "北海道" },
  { value: "aomori", label: "青森県" },
  { value: "iwate", label: "岩手県" },
  { value: "miyagi", label: "宮城県" },
  { value: "akita", label: "秋田県" },
  { value: "yamagata", label: "山形県" },
  { value: "fukushima", label: "福島県" },
  { value: "ibaraki", label: "茨城県" },
  { value: "tochigi", label: "栃木県" },
  { value: "gunma", label: "群馬県" },
  { value: "saitama", label: "埼玉県" },
  { value: "chiba", label: "千葉県" },
  { value: "tokyo", label: "東京都" },
  { value: "kanagawa", label: "神奈川県" },
  { value: "niigata", label: "新潟県" },
  { value: "toyama", label: "富山県" },
  { value: "ishikawa", label: "石川県" },
  { value: "fukui", label: "福井県" },
  { value: "yamanashi", label: "山梨県" },
  { value: "nagano", label: "長野県" },
  { value: "gifu", label: "岐阜県" },
  { value: "shizuoka", label: "静岡県" },
  { value: "aichi", label: "愛知県" },
  { value: "mie", label: "三重県" },
  { value: "shiga", label: "滋賀県" },
  { value: "kyoto", label: "京都府" },
  { value: "osaka", label: "大阪府" },
  { value: "hyogo", label: "兵庫県" },
  { value: "nara", label: "奈良県" },
  { value: "wakayama", label: "和歌山県" },
  { value: "tottori", label: "鳥取県" },
  { value: "shimane", label: "島根県" },
  { value: "okayama", label: "岡山県" },
  { value: "hiroshima", label: "広島県" },
  { value: "yamaguchi", label: "山口県" },
  { value: "tokushima", label: "徳島県" },
  { value: "kagawa", label: "香川県" },
  { value: "ehime", label: "愛媛県" },
  { value: "kochi", label: "高知県" },
  { value: "fukuoka", label: "福岡県" },
  { value: "saga", label: "佐賀県" },
  { value: "nagasaki", label: "長崎県" },
  { value: "kumamoto", label: "熊本県" },
  { value: "oita", label: "大分県" },
  { value: "miyazaki", label: "宮崎県" },
  { value: "kagoshima", label: "鹿児島県" },
  { value: "okinawa", label: "沖縄県" },
];

const other = ["一人暮らし相談可", "高齢者相談可"];

export default function CatSearch() {
  return (
    <ul className="flex flex-wrap gap-4">
      {/* 毛色 */}
      <li className="flex w-full gap-2">
        <div className="text-center w-35 bg-gray-300 h-8 flex items-center justify-center shrink-0">
          毛色
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {hairColors.map((color) => (
            <Checkbox key={color} label={color} name="hairColor" />
          ))}
        </div>
      </li>

      {/* 募集地域 */}
      <li className="flex w-[calc((100%_-_2rem)_/_2)] gap-2">
        <div className="text-center w-35 bg-gray-300 h-8 flex items-center justify-center shrink-0">
          募集地域
        </div>
        <Select name="prefecture" options={prefectures} />
      </li>

      {/* 年齢 */}
      <li className="flex w-[calc((100%_-_2rem)_/_2)] gap-2">
        <div className="text-center w-35 bg-gray-300 h-8 flex items-center justify-center shrink-0">
          年齢
        </div>
        <Select
          name="age"
          options={[
            { value: "child", label: "幼少期" },
            { value: "young", label: "若年期" },
            { value: "senior", label: "高齢期" },
          ]}
        />
      </li>

      {/* 性別 */}
      <li className="flex w-[calc((100%_-_2rem)_/_2)] gap-2">
        <div className="text-center w-35 bg-gray-300 h-8 flex items-center justify-center shrink-0">
          性別
        </div>
        <Select
          name="gender"
          options={[
            { value: "male", label: "オス" },
            { value: "female", label: "メス" },
            { value: "unknown", label: "不明" },
          ]}
        />
      </li>

      {/* 避妊・去勢 */}
      <li className="flex w-[calc((100%_-_2rem)_/_2)] gap-2">
        <div className="text-center w-35 bg-gray-300 h-8 flex items-center justify-center shrink-0">
          避妊・去勢
        </div>
        <Select
          name="neuter"
          options={[
            { value: "done", label: "済み" },
            { value: "not_done", label: "未" },
          ]}
        />
      </li>

      {/* その他条件 */}
      <li className="flex w-[calc((100%_-_2rem)_/_2)] gap-2">
        <div className="text-center w-35 bg-gray-300 h-8 flex items-center justify-center shrink-0">
          その他条件
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {other.map((other) => (
            <Checkbox key={other} label={other} name="other" />
          ))}
        </div>
      </li>
    </ul>
  );
}
