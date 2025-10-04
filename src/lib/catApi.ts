// src/lib/catApi.ts
import { supabase } from "./supabaseClient";

export type Cat = {
  id: string;
  user_id: string;
  title: string; // UIで使いたいので仮に付ける
  prefecture: string;
  color: string;
  age: string;
  gender: string;
  vaccinated: boolean;
  neutered: boolean;
  single_ok: boolean;
  elderly_ok: boolean;
  description: string | null;
  personality: string | null;
  health_condition: string | null;
  adopted: boolean;
};

export async function fetchCatById(id: string): Promise<Cat | null> {
  const { data, error } = await supabase
    .from("cat_adoption_info")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching cat:", error);
    return null;
  }

  return data as Cat;
}

export type CatImage = {
  id: string;
  cat_id: string;
  image_url: string;
  order: number | null;
};

export async function fetchCatImages(catId: string): Promise<CatImage[]> {
  const { data, error } = await supabase
    .from("cat_images")
    .select("*")
    .eq("cat_id", catId)
    .order("order", { ascending: true });

  if (error) {
    console.error("Error fetching cat images:", error);
    return [];
  }

  return data as CatImage[];
}

export type Adoption = {
  id: string;
  cat_id: string;
  from_user_id: string;
  to_user_id: string;
  created_at: string;
  updated_at: string;
  from_user?: { name: string };
  to_user?: { name: string };
};

export async function fetchAdoptionByCatId(
  catId: string
): Promise<Adoption | null> {
  const { data, error } = await supabase
    .from("adoptions")
    .select(
      `
        *,
        from_user:from_user_id(name),
        to_user:to_user_id(name)
      `
    )
    .eq("cat_id", catId)
    .single();

  if (error) {
    console.error("Error fetching adoption:", error);
    return null;
  }

  return data as unknown as Adoption;
}

export type CatUpdate = {
  id: string;
  cat_id: string;
  user_id: string;
  update_text: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  user?: { name: string };
};

export async function fetchCatUpdates(catId: string): Promise<CatUpdate[]> {
  const { data, error } = await supabase
    .from("cat_updates")
    .select(
      `
        *,
        user:user_id(name)
      `
    )
    .eq("cat_id", catId)
    .order("created_at", { ascending: false }); // 新しい順

  if (error) {
    console.error("Error fetching cat updates:", error);
    return [];
  }

  return data as unknown as CatUpdate[];
}

// import { Cat } from "@/types/cat";

// const cats: Cat[] = [
//   {
//     id: "1",
//     title: "人懐っこい男の子",
//     color: "茶白",
//     prefecture: "北海道",
//     age: "幼少期",
//     gender: "オス",
//     neuter: "未",
//     other: "一人暮らし相談可",
//     description: `【性格】
// 常に家族の側におり、にゃあにゃあ言いながら人間の足にスリスリしてきます。膝の上が好きでなかなか降りてくれません。
// 撫でられるのも大好きで、特にお腹を撫でられるとヘソ天になり、喉をゴロゴロと鳴らします。

// 【特徴】
// 瞳の色が黄金色をしていてとっても綺麗です。尻尾の付け根をトントンすると腰を高くあげて喜びます。
// 数本ずつ爪を切ることもできます。

// 【健康状態】
// 特に異常なし`,
//     mainPic: "/top/newcat-list-img01.jpg",
//     sliderImages: [
//       "/sample/cat-slide01.jpg",
//       "/sample/cat-slide02.jpg",
//       "/sample/cat-slide03.jpg",
//       "/sample/cat-slide04.jpg",
//       "/sample/cat-slide05.jpg",
//       "/sample/cat-slide06.jpg",
//       "/sample/cat-slide07.jpg",
//     ],
//   },
// ];

// export async function fetchCatById(id: string): Promise<Cat | undefined> {
//   // 本番では DB や API を叩く
//   return cats.find((cat) => cat.id === id);
// }
