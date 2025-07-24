"use client";
import Image from "next/image";
import React from "react";

const CleaningBanner = () => {
  return (
    <div className="max-w-6xl mx-auto rounded-xl overflow-hidden relative h-[250px] sm:h-[500px] lg:max-w-7xl md:h-[500px] ">
      <Image
        src="https://i.ibb.co/PvCKttYs/360-F-199161317-f6-Mwn30-FV9w-UTX2-Ejfz-Cc1-Vn-Yrx9-JMRo.jpg"
        alt="Fruits Banner"
        fill
        className="object-cover"
        priority
        unoptimized
      />
    </div>
  );
};

export default CleaningBanner;
