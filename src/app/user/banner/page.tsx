// "use client";

// import { Swiper, SwiperSlide } from "swiper/react";

// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "./style.css";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";

// import logo2 from "../../../app/user/allImages/grosary1.jpg";
// import logo3 from "../../../app/user/allImages/grosary2.avif";
// import logo4 from "../../../app/user/allImages/grosary3.avif";
// import Image from "next/image";

// const BannerPage = () => {
//   return (
//     <div className="max-w-6xl  mx-auto px-4 sm:px-6 lg:px-8 my-6">
//       <Swiper
//         spaceBetween={16}
//         centeredSlides={true}
//         autoplay={{
//           delay: 3000,
//           disableOnInteraction: false,
//         }}
//         pagination={{
//           clickable: true,
//         }}
//         navigation={true}
//         modules={[Autoplay, Pagination, Navigation]}
//         className="rounded-xl shadow-lg"
//       >
//         {[logo2, logo3, logo4].map((image, index) => (
//           <SwiperSlide key={index}>
//             <div className="w-full h-[180px] sm:h-[240px] md:h-[300px] lg:h-[400px] xl:h-[450px] rounded-xl overflow-hidden">
//               <Image
//                 src={image}
//                 alt={`slide-${index}`}
//                 width={1200}
//                 height={600}
//                 className=" object-cover"
//                 priority
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default BannerPage;
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

import logo2 from "../../../app/user/allImages/bannerimage/vegitable.jpg";
import logo3 from "../../../app/user/allImages/bannerimage/meet.jpg";
import logo4 from "../../../app/user/allImages/bannerimage/fish.webp";
import logo5 from "../../../app/user/allImages/bannerimage/cleaning.webp";
import logo6 from "../../../app/user/allImages/bannerimage/cookingestimate.webp";
import Link from "next/link";

const slides = [
  {
    image: logo2,
    title: "Fresh Groceries Delivered",
    description: "Get the best quality at your doorstep within hours.",
  },
  {
    image: logo3,
    title: "Weekly Deals & Discounts",
    description: "Save more with our exclusive offers on top brands.",
  },
  {
    image: logo4,
    title: "Everything You Need, Anytime",
    description: "Explore our wide selection of groceries & essentials.",
  },
  {
    image: logo5,
    title: "Everything You Need, Anytime",
    description: "Explore our wide selection of groceries & essentials.",
  },
  {
    image: logo6,
    title: "Everything You Need, Anytime",
    description: "Explore our wide selection of groceries & essentials.",
  },
];

const BannerPage = () => {
  return (
    <div className="max-w-6xl mx-auto my-6">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        modules={[Autoplay, Pagination, Navigation]}
        className="rounded-xl shadow-lg"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[220px] sm:h-[300px] md:h-[380px] lg:h-[480px] xl:h-[550px]">
              <Image
                src={slide.image}
                alt={`Banner slide ${index}`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 flex justify-center items-center p-4">
                <div className="bg-white/20 backdrop-blur-md rounded-xl px-6 py-4 text-blue-500 text-center max-w-lg w-full shadow-lg">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 drop-shadow">
                    {slide.title}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 drop-shadow-sm">
                    {slide.description}
                  </p>
                  <Link href="/user/allfruitesandvegetables">
                    <button className="bg-blue-500  text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition">
                      Shop Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerPage;
