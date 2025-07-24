"use client";
import Image from "next/image";
import React from "react";

const VegitablesBanner = () => {
  return (
    <div className="max-w-6xl mx-auto rounded-xl overflow-hidden relative h-[250px] sm:h-[500px] lg:max-w-7xl md:h-[600px] shadow-lg">
      <Image
        src="https://i.ibb.co/Sw1nJpH3/vegetable-grocery-delivery-promotion-web-banner-facebook-cover-instagram-template-502896-109.jpg"
        alt="Fruits Banner"
        fill
        className="object-cover"
        priority
        unoptimized
      />
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <h2 className="text-white text-3xl font-bold"></h2>
      </div>
    </div>
  );
};

export default VegitablesBanner;
