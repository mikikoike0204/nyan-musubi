// src/types/color.ts
export type Color =
  | "白系"
  | "黒系"
  | "茶系"
  | "グレー系"
  | "サビ"
  | "茶白"
  | "白黒"
  | "茶トラ"
  | "キジトラ"
  | "キジ白"
  | "サバトラ"
  | "その他";

export const colorOptions: { value: string; label: string }[] = [
  { value: "白系", label: "白系" },
  { value: "黒系", label: "黒系" },
  { value: "茶系", label: "茶系" },
  { value: "グレー系", label: "グレー系" },
  { value: "サビ", label: "サビ" },
  { value: "茶白", label: "茶白" },
  { value: "白黒", label: "白黒" },
  { value: "茶トラ", label: "茶トラ" },
  { value: "キジトラ", label: "キジトラ" },
  { value: "キジ白", label: "キジ白" },
  { value: "サバトラ", label: "サバトラ" },
  { value: "その他", label: "その他" },
];
