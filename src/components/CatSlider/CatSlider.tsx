"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import "./style.css";
import { useState } from "react";
import Image from "next/image";

interface CatSliderProps {
  images: string[];
}

export default function CatSlider({ images }: CatSliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

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
              style={{ objectFit: "cover" }}
              className="p-detail-slider__thumb-image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
