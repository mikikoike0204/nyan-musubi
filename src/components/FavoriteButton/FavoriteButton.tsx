// src/components/FavoriteButton/FavoriteButton.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface FavoriteButtonProps {
  catId: string;
  isAdopted?: boolean;
  showAlways?: boolean; // 新しいプロパティ
}

export default function FavoriteButton({
  catId,
  isAdopted = false,
  showAlways = false, // デフォルトはfalse
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const response = await fetch("/api/favorites/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cat_id: catId }),
        });

        if (response.ok) {
          const data = await response.json();
          setIsFavorite(data.isFavorite);
        }
      } catch (error) {
        console.error("Failed to check favorite:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkFavoriteStatus();
  }, [catId]);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    try {
      if (isFavorite) {
        const response = await fetch("/api/favorites", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cat_id: catId }),
        });

        if (response.ok) {
          setIsFavorite(false);
          router.refresh();
        }
      } else {
        const response = await fetch("/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cat_id: catId }),
        });

        if (response.ok) {
          setIsFavorite(true);
          router.refresh();
        }
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // showAlwaysがfalseで譲渡済みの場合のみ「家族が決まりました」を表示
  if (isAdopted && !showAlways) {
    return (
      <div className="p-top-newcat__adopted-label">家族が決まりました！</div>
    );
  }

  return (
    <button
      className={`p-top-newcat__fav ${isFavorite ? "added" : ""}`}
      onClick={handleToggleFavorite}
      disabled={isLoading}
    >
      {isFavorite ? "お気に入り済み❤︎" : "お気に入り❤︎"}
    </button>
  );
}
