"use client";

import Image from "next/image";

const AllFreshFruitsAndVegetableBanner = () => {
  return (
    <div className="max-w-6xl mx-auto rounded-xl overflow-hidden relative h-[250px] sm:h-[500px] lg:max-w-7xl md:h-[500px] ">
      <Image
        src="https://i.ibb.co/j9cQ1Nkx/istockphoto-2151094353-612x612.jpg"
        alt="Fruits Banner and Vegetables"
        fill
        className="object-cover"
        priority
        unoptimized
      />
    </div>
  );
};

export default AllFreshFruitsAndVegetableBanner;
