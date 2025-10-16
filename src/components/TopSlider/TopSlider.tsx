"use client"; // Swiper はクライアントコンポーネント必須

import styles from "./TopSlider.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";

export default function TopSlider() {
  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      effect="fade"
      autoplay={{ delay: 5000 }}
      loop
      speed={2000}
      className={styles.topSlider}
    >
      <SwiperSlide>
        <div className={styles.slideContent}>
          <Image
            src="/top/slider01.jpg"
            alt="スライダー1"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.slideContent}>
          <Image
            src="/top/slider02.jpg"
            alt="スライダー2"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.slideContent}>
          <Image
            src="/top/slider03.jpg"
            alt="スライダー3"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
