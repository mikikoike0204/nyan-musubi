// src/components/CatListItems/CatListItem.tsx
import Link from "next/link";
import Image from "next/image";
import { Cat } from "@/types/cat";
import { getGenderDisplay, getAgeDisplay } from "@/utils/catDisplay";
import "./style.css";
interface CatListItemProps {
  cat: Cat;
}

export default function CatListItem({ cat }: CatListItemProps) {
  return (
    <li className="p-top-newcat__item">
      <Link
        className="p-top-newcat__link"
        href={cat.adopted ? `/adopted/${cat.id}` : `/cats/${cat.id}`}
      >
        {cat.adopted && (
          <div className="p-top-newcat__shuku">
            <Image src="/top/icon-shuku.png" alt="祝" width={72} height={64} />
          </div>
        )}

        <div className="p-top-newcat__image">
          <Image
            src={cat.thumbnail || "/images/no-image.jpg"}
            alt={`${cat.title}の画像`}
            fill
            sizes="185px"
            style={{ objectFit: "cover" }}
            className="p-top-newcat__image-pic"
          />
        </div>

        <div className="p-top-newcat__desc">
          <div className="p-top-newcat__desc-inner">
            <div className="p-top-newcat__text1">
              {cat.color} {getGenderDisplay(cat.gender)}
              <br />
              {getAgeDisplay(cat.age)} / {cat.prefecture}
            </div>
            <div className="p-top-newcat__text2">
              <h3 className="p-top-newcat__text2-title">{cat.title}</h3>
            </div>
          </div>

          {cat.adopted ? (
            <div className="p-top-newcat__adopted-label">
              家族が決まりました！
            </div>
          ) : (
            <button className="p-top-newcat__fav">お気に入り❤︎</button>
          )}
        </div>
      </Link>
    </li>
  );
}
