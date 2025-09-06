// src/lib/catApi.ts
export interface Cat {
  id: string;
  title: string;
  color:   "白系" | "黒系" | "茶系" | "グレー系" | "サビ" | "茶白" | "白黒" | "茶トラ" | "キジトラ" | "サバトラ" | "その他";
  prefecture: "北海道" | "青森県" | "岩手県" | "宮城県" | "秋田県" | "山形県" | "福島県" | "茨城県" | "栃木県" | "群馬県" | "埼玉県" | "千葉県" | "東京都" | "神奈川県" | "新潟県" | "富山県" | "石川県" | "福井県" | "山梨県" | "長野県" | "岐阜県" | "静岡県" | "愛知県" | "三重県" | "滋賀県" | "京都府" | "大阪府" | "兵庫県" | "奈良県" | "和歌山県" | "鳥取県" | "島根県" | "岡山県" | "広島県" | "山口県" | "徳島県" | "香川県" | "愛媛県" | "高知県" | "福岡県" | "佐賀県" | "長崎県" | "熊本県" | "大分県" | "宮崎県" | "鹿児島県" | "沖縄県";
  age: "幼少期" | "若年期" | "高齢期",
  gender: "オス" | "メス" | "不明";
  neuter: "済み" | "未",
  other?: "一人暮らし相談可" | "高齢者相談可",
  description?: string;
  mainPic: string,
  sliderImages: string[],
}

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
    description: "常に家族の側におり、にゃあにゃあ言いながら人間の足にスリスリしてきます。膝の上が好きでなかなか降りてくれません。撫でられるのも大好きで、特にお腹を撫でられるとヘソ天になり、喉をゴロゴロと鳴らします。",
    mainPic: "/top/newcat-list-img01.jpg",
    sliderImages: [
      "/cats/1/slide01.jpg",
      "/cats/1/slide02.jpg",
      "/cats/1/slide03.jpg",
    ], 
  },
];

export async function fetchCatById(id: string): Promise<Cat | undefined> {
  // 本番では DB や API を叩く
  return cats.find((cat) => cat.id === id);
}
