// src/components/CatSlider/CatSlider.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper/types";
import { useState } from "react";
import Image from "next/image";
import styles from "./CatSlider.module.css";

// Swiperのスタイルをインポート
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";

interface CatSliderProps {
  images: string[];
}

export default function CatSlider({ images }: CatSliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className={styles.detailSliderWrap}>
      <div className={styles.detailSliderMainWrap}>
        {/* メインスライダー */}
        <Swiper
          modules={[Thumbs, Navigation]}
          thumbs={{ swiper: thumbsSwiper }}
          navigation
          className={styles.detailSliderMain}
        >
          {images.map((src, i) => (
            <SwiperSlide key={i} className={styles.detailSliderMainSlide}>
              <Image
                src={src}
                alt={`ねこ画像 ${i}`}
                fill
                sizes="760px"
                style={{ objectFit: "contain" }}
                className={styles.detailSliderMainImage}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* サムネイルスライダー */}
      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        slidesPerView={7}
        spaceBetween={10}
        watchSlidesProgress
        className={styles.detailSliderThumb}
      >
        {images.map((src, i) => (
          <SwiperSlide key={i} className={styles.detailSliderThumbSlide}>
            <Image
              src={src}
              alt={`サムネイル ${i}`}
              fill
              sizes="135px"
              style={{ objectFit: "cover" }}
              className={styles.detailSliderThumbImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
