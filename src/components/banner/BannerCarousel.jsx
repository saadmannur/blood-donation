"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import hero1 from "@/assets/img-1.jpg";
import hero2 from "@/assets/img-2.jpg";
import hero3 from "@/assets/img-3.jpg";
import hero4 from "@/assets/img-4.jpg";
import hero5 from "@/assets/img-5.jpg";

const slides = [hero1, hero2, hero3, hero4, hero5];

const BannerCarousel = ({ className = "h-full" }) => {
  const [mounted, setMounted] = useState(false);

  // Initialize Swiper only in the browser.
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`relative w-full ${className}`}>
      {!mounted ? (
        // Static fallback during server prerendering and initial hydration.
        <Image
          src={hero1}
          alt="Blood donation"
          fill
          priority
          sizes="(min-width: 640px) 400px, 320px"
          className="object-cover"
        />
      ) : (
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation
          pagination={{ clickable: true }}
          className="h-full w-full [--swiper-navigation-size:18px] [--swiper-pagination-color:#dc2626] [--swiper-navigation-color:#ffffff] [&_.swiper-button-next]:hidden [&_.swiper-button-prev]:hidden md:[&_.swiper-button-next]:flex md:[&_.swiper-button-prev]:flex"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <Image
                  src={slide}
                  alt={`Blood donation slide ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 640px) 400px, 320px"
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default BannerCarousel;
