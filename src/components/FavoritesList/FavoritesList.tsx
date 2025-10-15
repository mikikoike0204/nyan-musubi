// src/components/FavoritesList/FavoritesList.tsx
import { getFavorites } from "@/lib/supabase/queries";
import FavoriteListItem from "@/components/FavoriteListItem/FavoriteListItem";
import "./style.css";

export default async function FavoritesList() {
  const favorites = await getFavorites();

  if (favorites.length === 0) {
    return (
      <div className="p-favorites__empty">
        <p>お気に入りに追加されたねこちゃんはまだいません</p>
      </div>
    );
  }

  return (
    <ul className={styles.topNewcatList}>
      {favorites.map((favorite) => (
        <FavoriteListItem key={favorite.id} favorite={favorite} />
      ))}
    </ul>
  );
}
