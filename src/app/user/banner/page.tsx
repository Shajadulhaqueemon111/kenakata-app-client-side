"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import logo2 from "../../../app/user/allImages/grosary1.jpg";
import logo3 from "../../../app/user/allImages/grosary2.avif";
import logo4 from "../../../app/user/allImages/grosary3.avif";
import Image from "next/image";
// import SecondBanner from "../secondbanner/page";
// import PopularCategory from "../popularCategory/page";
// import ShopeAndGetMore from "../shopeAndGetmore/page";
// import CurrentDelevary from "../currentDelevary/page";
// import BeautifulCollapsible from "../CommonQuestion/page";

const BannerPage = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
      <Swiper
        spaceBetween={20}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="rounded-xl shadow-lg"
      >
        {[logo2, logo3, logo4].map((image, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-[180px] sm:h-[280px] md:h-[400px] lg:h-[450px] rounded-xl overflow-hidden">
              <Image
                src={image}
                alt={`slide-${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerPage;
