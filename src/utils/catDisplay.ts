// src/utils/catDisplay.ts
import { Cat } from "@/types/cat";

export const getAgeDisplay = (age: Cat["age"]): string => {
  return age;
};

export const getGenderDisplay = (gender: Cat["gender"]): string => {
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
