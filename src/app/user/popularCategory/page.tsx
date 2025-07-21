"use client";
import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import frutsvagitables from "../../user/allImages/benefits-of-vegetables-1Th.jpg";
import meetandfish from "../../user/allImages/fishandmit.jpg";
import cooking from "../../user/allImages/cooking.jpg";
import cleanning from "../../user/allImages/cleaning.webp";
import pran from "../../user/allImages/popularon/pran.webp";
import rekit from "../../user/allImages/popularon/reckitt.webp";
import nestle from "../../user/allImages/popularon/nestle.webp";
import unilivers from "../../user/allImages/popularon/uniliver.webp";
import godrej from "../../user/allImages/popularon/godrej-seeklogo.webp";
import cokakola from "../../user/allImages/popularon/coca-cola.webp";
import megi from "../../user/allImages/popularon/fresh.webp";

const categories = [
  {
    name: "Fruits & Vegetables",
    image: frutsvagitables,
    bgColor: "bg-green-100",
    borderColor: "border-green-300",
  },
  {
    name: "Meat & Fish",
    image: meetandfish,
    bgColor: "bg-red-100",
    borderColor: "border-red-300",
  },
  {
    name: "Cooking Essentials",
    image: cooking,
    bgColor: "bg-yellow-100",
    borderColor: "border-yellow-300",
  },
  {
    name: "Cleaning Products",
    image: cleanning,
    bgColor: "bg-blue-100",
    borderColor: "border-blue-300",
  },
];

export default function PopularCategory() {
  return (
    <div>
      <section className="py-10 px-4 md:px-8 lg:px-16">
        <h2 className="text-xl font-semibold mb-8 text-center text-gray-800">
          Popular Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`${category.bgColor} ${category.borderColor} border rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition duration-300 hover:scale-105`}
            >
              <div className="w-28 h-28 rounded-md overflow-hidden mb-4 border border-gray-200">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>

              <h3 className="text-md mt-4 font-semibold text-gray-700 text-center">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </section>
      <div>
        <h1 className="text-xl font-bold text-center mt-4 text-black">
          Popular On Kenakata
        </h1>

        <Marquee>
          <div className="flex flex-wamp justify-center gap-6 px-4 sm:justify-evenly sm:gap-8 mt-4">
            <Image
              src={pran}
              alt="pran"
              height={80}
              width={80}
              className="object-contain"
            />
            <Image
              src={rekit}
              alt="rekit"
              height={80}
              width={80}
              className="object-contain"
            />
            <Image
              src={nestle}
              alt="nestle"
              height={80}
              width={80}
              className="object-contain"
            />
            <Image
              src={unilivers}
              alt="unilivers"
              height={80}
              width={80}
              className="object-contain"
            />
            <Image
              src={godrej}
              alt="godrej"
              height={80}
              width={80}
              className="object-contain"
            />
            <Image
              src={cokakola}
              alt="cokakola"
              height={80}
              width={80}
              className="object-contain"
            />
            <Image
              src={megi}
              alt="megi"
              height={80}
              width={80}
              className="object-contain"
            />
          </div>
        </Marquee>
      </div>
    </div>
  );
}
