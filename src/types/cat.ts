// src/types/cat.ts
import { Prefecture } from "./prefectures";
export interface Cat {
  id: string;
  title: string;
  color:
    | "白系"
    | "黒系"
    | "茶系"
    | "グレー系"
    | "サビ"
    | "茶白"
    | "白黒"
    | "茶トラ"
    | "キジトラ"
    | "サバトラ"
    | "その他";
  prefecture: Prefecture;
  age: "幼少期" | "若年期" | "高齢期";
  gender: "オス" | "メス" | "不明";
  neuter: "済み" | "未";
  other?: "一人暮らし相談可" | "高齢者相談可";
  description?: string;
  mainPic: string;
  sliderImages: string[];
}
