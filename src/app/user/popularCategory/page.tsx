/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import publicAxios from "@/axiosInstance/publicaxios";
import { TiShoppingCart } from "react-icons/ti";
// Image imports
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
import Loading from "../loading";

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await publicAxios("/grosary-product");
        const productArray = res.data.data;

        const selected =
          selectedCategory?.toLowerCase().replace(/\s/g, "") || "";

        const filteredData = productArray.filter((p: { category: string }) => {
          const prodCat = p.category.toLowerCase().replace(/\s/g, "");
          console.log("prodCat:", prodCat);

          if (selected === "meat&fish") {
            return prodCat === "meat" || prodCat === "fish";
          }
          if (selected === "fruits&vegetables") {
            return prodCat === "fruits" || prodCat === "vegetables";
          }
          return prodCat === selected;
        });

        setProducts(filteredData);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (selectedCategory) {
      fetchProducts();
    }
  }, [selectedCategory]);

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
              onClick={() => setSelectedCategory(category.name)}
              className={`${category.bgColor} ${
                category.borderColor
              } border rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition duration-300 hover:scale-105 cursor-pointer ${
                selectedCategory === category.name
                  ? "ring-4 ring-indigo-400"
                  : ""
              }`}
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

      {/* Product Cards */}
      <section className="py-10 px-4 md:px-8 lg:px-16">
        <h2 className="text-xl font-semibold mb-8 text-center text-gray-800">
          {selectedCategory
            ? `Products in "${selectedCategory}"`
            : "Select a category to view products"}
        </h2>

        {loading && (
          <div className="text-center text-gray-500">
            <Loading></Loading>{" "}
          </div>
        )}

        {!loading && products.length === 0 && selectedCategory && (
          <p className="text-center text-gray-500">No products found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between border p-4 rounded shadow hover:shadow-lg transition h-full"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className="w-full h-[200px] object-cover rounded"
              />

              <h3 className="font-semibold mt-2 text-black">{product.name}</h3>

              {/* Fixed height for description to prevent layout shift */}
              <p className="text-sm text-gray-600 h-[48px] overflow-hidden">
                {product.description}
              </p>

              <p className="mt-1 font-bold text-black">৳{product.price}</p>
              <p className="text-xs text-gray-500">Weight: {product.weight}</p>

              <div className="text-center mx-auto mt-4">
                <button className="text-sm flex gap-2 font-semibold text-red-500 py-2 px-4 w-full border border-red-300 rounded">
                  <TiShoppingCart className="text-center text-xl  " />
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Marquee */}
      <div>
        <h1 className="text-xl font-bold text-center mt-4 text-black">
          Popular On Kenakata
        </h1>
        <Marquee>
          <div className="flex flex-wrap justify-center gap-6 px-4 sm:justify-evenly sm:gap-8 mt-4">
            {[pran, rekit, nestle, unilivers, godrej, cokakola, megi].map(
              (img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt={`brand-${idx}`}
                  height={80}
                  width={80}
                  className="object-contain"
                />
              )
            )}
          </div>
        </Marquee>
      </div>
    </div>
  );
}
