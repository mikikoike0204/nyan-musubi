// src/lib/catApi.ts
import { Cat } from "@/types/cat";

const cats: Cat[] = [
  {
    id: "1",
    title: "人懐っこい男の子",
    color: "茶白",
    prefecture: "北海道",
    age: "幼少期",
    gender: "オス",
    neuter: "未",
    other: "一人暮らし相談可",
    description: `【性格】
常に家族の側におり、にゃあにゃあ言いながら人間の足にスリスリしてきます。膝の上が好きでなかなか降りてくれません。
撫でられるのも大好きで、特にお腹を撫でられるとヘソ天になり、喉をゴロゴロと鳴らします。

【特徴】
瞳の色が黄金色をしていてとっても綺麗です。尻尾の付け根をトントンすると腰を高くあげて喜びます。
数本ずつ爪を切ることもできます。

【健康状態】
特に異常なし`,
    mainPic: "/top/newcat-list-img01.jpg",
    sliderImages: [
      "/sample/cat-slide01.jpg",
      "/sample/cat-slide02.jpg",
      "/sample/cat-slide03.jpg",
      "/sample/cat-slide04.jpg",
      "/sample/cat-slide05.jpg",
      "/sample/cat-slide06.jpg",
      "/sample/cat-slide07.jpg",
    ],
  },
];

export async function fetchCatById(id: string): Promise<Cat | undefined> {
  // 本番では DB や API を叩く
  return cats.find((cat) => cat.id === id);
}
