"use client"; // Swiper はクライアントコンポーネント必須

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
import Image from "next/image";

export default function TopSlider() {
  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      effect="fade" // フェード切り替え
      autoplay={{ delay: 5000 }} // 5秒ごとに自動切り替え
      loop
      speed={2000} // 切り替え速度 2秒
      className="w-full h-[500px]"
    >
      <SwiperSlide>
        <div className="relative w-full h-[500px]">
          <Image
            src="/top/slider01.jpg"
            alt="スライダー1"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full h-[500px]">
          <Image
            src="/top/slider02.jpg"
            alt="スライダー2"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full h-[500px]">
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
