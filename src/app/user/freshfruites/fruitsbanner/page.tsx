"use client";
import Image from "next/image";
import React from "react";

const FruitesBanner = () => {
  return (
    <div className="max-w-6xl mx-auto rounded-xl overflow-hidden relative h-[250px] sm:h-[500px] md:h-[600px] lg:max-w-7xl">
      <Image
        src="https://i.ibb.co/bjBPDKW0/fruits-Banner.jpg"
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

export default FruitesBanner;
