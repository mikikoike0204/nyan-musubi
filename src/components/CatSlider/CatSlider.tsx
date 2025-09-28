// src/components/CatSlider/CatSlider.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper/types";
import { useState } from "react";
import Image from "next/image";
import "./style.css";

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
    <div className="p-detail-slider-wrapper">
      <div className="p-detail-slider__main-wrapper">
        <div className="p-detail-slider__fav"></div>
        {/* <div className="p-detail-slider__fav added"></div> */}
        {/* メインスライダー */}
        <Swiper
          modules={[Thumbs, Navigation]}
          thumbs={{ swiper: thumbsSwiper }}
          navigation
          className="p-detail-slider__main"
        >
          {images.map((src, i) => (
            <SwiperSlide key={i} className="p-detail-slider__main-slide">
              <Image
                src={src}
                alt={`猫画像 ${i}`}
                fill
                sizes="760px"
                style={{ objectFit: "contain" }}
                className="p-detail-slider__main-image"
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
        className="p-detail-slider__thumb"
      >
        {images.map((src, i) => (
          <SwiperSlide key={i} className="p-detail-slider__thumb-slide">
            <Image
              src={src}
              alt={`サムネイル ${i}`}
              fill
              sizes="120px"
              style={{ objectFit: "cover" }}
              className="p-detail-slider__thumb-image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
