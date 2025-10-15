// src/components/FavoriteListItem/FavoriteListItem.css
import Link from "next/link";
import Image from "next/image";
import { getGenderDisplay, getAgeDisplay } from "@/utils/catDisplay";
import styles from "./FavoriteListItem.module.css";

interface FavoriteListItemProps {
  favorite: {
    id: string;
    cat_adoption_info: {
      id: string;
      prefecture: string;
      color: string;
      age: string;
      gender: string;
      adopted: boolean;
      thumbnail_url: string | null;
      title: string;
    };
  };
}

export default function FavoriteListItem({ favorite }: FavoriteListItemProps) {
  const cat = favorite.cat_adoption_info;
  const href = cat.adopted ? `/adopted/${cat.id}` : `/cats/${cat.id}`;

  return (
    <li className={styles.topNewCatItem}>
      <Link className={styles.topNewCatLink} href={href}>
        {cat.adopted && (
          <div className={styles.topNewCatShuku}>
            <Image src="/top/icon-shuku.png" alt="祝" width={72} height={64} />
          </div>
        )}

        <div className={styles.topNewCatImage}>
          <Image
            src={cat.thumbnail_url || "/images/no-image.jpg"}
            alt={`${cat.title}の画像`}
            fill
            sizes="185px"
            style={{ objectFit: "cover" }}
            className={styles.topNewCatImagePic}
          />
        </div>

        <div className={styles.topNewCatDesc}>
          <div className={styles.topNewCatDescInner}>
            <div className={styles.topNewCatText1}>
              {cat.color}{" "}
              {getGenderDisplay(cat.gender as "オス" | "メス" | "不明")}
              <br />
              {getAgeDisplay(cat.age as "幼少期" | "若年期" | "高齢期")} /{" "}
              {cat.prefecture}
            </div>
            <div className={styles.topNewCatText2}>
              <h3 className={styles.topNewCatText2Title}>{cat.title}</h3>
            </div>
          </div>

          <button className="p-top-newcat__fav added">お気に入り済み❤︎</button>
        </div>
      </Link>
    </li>
  );
}
