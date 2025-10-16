// src/components/CatListItems/CatListItem.tsx
import Link from "next/link";
import Image from "next/image";
import { Cat } from "@/types/cat";
import { getGenderDisplay, getAgeDisplay } from "@/utils/catDisplay";
import styles from "./CatListItem.module.css";
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton";
interface CatListItemProps {
  cat: Cat;
}

export default function CatListItem({ cat }: CatListItemProps) {
  return (
    <li className={styles.topNewCatItem}>
      <Link
        className={styles.topNewCatLink}
        href={cat.adopted ? `/adopted/${cat.id}` : `/cats/${cat.id}`}
      >
        {cat.adopted && (
          <div className="p-top-newcat__shuku">
            <Image src="/top/icon-shuku.png" alt="祝" width={72} height={64} />
          </div>
        )}

        <div className={styles.topNewCatImage}>
          <Image
            src={cat.thumbnail || "/images/no-image.jpg"}
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
              {cat.color} {getGenderDisplay(cat.gender)}
              <br />
              {getAgeDisplay(cat.age)} / {cat.prefecture}
            </div>
            <div className={styles.topNewCatText2}>
              <h3 className={styles.topNewCatText2Title}>{cat.title}</h3>
            </div>
          </div>

          {/* {cat.adopted ? (
            <div className="p-top-newcat__adopted-label">
              家族が決まりました！
            </div>
          ) : (
            <button className="p-top-newcat__fav">お気に入り❤︎</button>
          )} */}
          <FavoriteButton catId={cat.id} isAdopted={cat.adopted} />
        </div>
      </Link>
    </li>
  );
}
