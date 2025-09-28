// src/types/cat.ts
import { Prefecture } from "./prefectures";
export interface Cat {
  id: string;
  title: string;
  thumbnail: string;
  sliderImages: string[];
  prefecture: Prefecture;
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
  age: "幼少期" | "若年期" | "高齢期";
  gender: "オス" | "メス" | "不明";
  vaccinated: boolean;
  neutered: boolean;
  single_ok: boolean;
  elderly_ok: boolean;
  created_at: string;
  updated_at: string;
  description: string;
  personality: string;
  health_condition: string;
  adopted: boolean;
}
