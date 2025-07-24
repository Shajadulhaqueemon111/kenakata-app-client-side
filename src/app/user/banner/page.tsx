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
import SecondBanner from "../secondbanner/page";
import PopularCategory from "../popularCategory/page";
import ShopeAndGetMore from "../shopeAndGetmore/page";
import CurrentDelevary from "../currentDelevary/page";
import BeautifulCollapsible from "../CommonQuestion/page";

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
        <SwiperSlide>
          <Image
            src={logo2}
            alt="medicine delivery"
            className="w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover rounded-xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={logo3}
            alt="pharmacy"
            className="w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover rounded-xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={logo4}
            alt="pharmacy"
            className="w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover rounded-xl"
          />
        </SwiperSlide>
      </Swiper>

      <div className="mt-4">
        <SecondBanner />
      </div>
      <div className="mt-4">
        <PopularCategory />
      </div>
      <div className="mt-4">
        <ShopeAndGetMore />
      </div>
      <div className="mt-4">
        <CurrentDelevary />
      </div>
      <div className="mt-4">
        <BeautifulCollapsible />
      </div>
    </div>
  );
};

export default BannerPage;
