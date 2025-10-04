// src/types/cat.ts
import { Color } from "./color";
import { Prefecture } from "./prefectures";
export interface Cat {
  id: string;
  user_id: string;
  title: string;
  thumbnail: string;
  sliderImages: string[];
  prefecture: Prefecture;
  color: Color;
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
