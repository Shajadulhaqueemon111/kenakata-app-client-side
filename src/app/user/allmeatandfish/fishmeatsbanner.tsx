"use client";

import Image from "next/image";

const FishMeatsbanner = () => {
  return (
    <div className="max-w-6xl mx-auto rounded-xl overflow-hidden relative h-[250px] sm:h-[500px] lg:max-w-7xl md:h-[500px] ">
      <Image
        src="https://i.ibb.co/PGSRLN8w/360-F-614089075-9z-P2-Ybcr5fwsn-HCz-Gs-PNLLkp-Th-Uru9-Zq.jpg"
        alt="Fruits Banner"
        fill
        className="object-cover"
        priority
        unoptimized
      />
    </div>
  );
};

export default FishMeatsbanner;
