"use client";
import Image from "next/image";
import React from "react";

const CookingBanner = () => {
  return (
    <div className="max-w-6xl mx-auto rounded-xl overflow-hidden relative h-[250px] sm:h-[500px] lg:max-w-7xl md:h-[500px] ">
      <Image
        src="https://i.ibb.co/N2dBH6zH/cooking-banner-background-with-spices-vegetables-top-view-free-space-your-text-187166-48329.jpg"
        alt="Fruits Banner"
        fill
        className="object-cover"
        priority
        unoptimized
      />
    </div>
  );
};

export default CookingBanner;
