/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import publicAxios from "@/axiosInstance/publicaxios";

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

import { useSearch } from "@/context/SearchContext";
import Rating from "@/components/Reating/Rating";
import { AiOutlineEye } from "react-icons/ai";
import Link from "next/link";

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
  const [selectedCategory, setSelectedCategory] = useState<string>(
    "Fruits & Vegetables"
  );
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { query } = useSearch();
  const [currentPage, setCurrentPage] = useState(1);

  const itemPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await publicAxios("/grosary-product");
        const productArray = res.data.data;

        const selected = selectedCategory.toLowerCase().replace(/\s/g, "");

        const filteredData = productArray.filter((p: { category: string }) => {
          const prodCat = p.category.toLowerCase().replace(/\s/g, "");

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

    fetchProducts();
  }, [selectedCategory]);

  const filterAllProduct = products.filter((product: any) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
  //pagination

  const totalPage = Math.ceil(filterAllProduct.length / itemPerPage);
  console.log(totalPage);
  const popularProductPagination = filterAllProduct.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );

  const handlePaginationChange = (page: any) => {
    if (page < 1 || page > totalPage) return;
    setCurrentPage(page);
  };
  return (
    <div>
      {/* Category Section */}
      <section className="py-10 px-4 sm:px-6 md:px-8 lg:px-16">
        <h2 className="text-xl font-semibold mb-8 text-center text-gray-800">
          Popular Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => setSelectedCategory(category.name)}
              className={`${category.bgColor} ${
                category.borderColor
              } border rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-xl transition duration-300 hover:scale-105 cursor-pointer ${
                selectedCategory === category.name
                  ? "ring-4 ring-indigo-400"
                  : ""
              }`}
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-md overflow-hidden border border-gray-200">
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

      <section className="py-10 px-4 md:px-8 lg:px-16">
        <h2 className="text-xl font-semibold mb-8 text-center text-gray-800">
          {selectedCategory
            ? `Products in "${selectedCategory}"`
            : "Select a category to view products"}
        </h2>

        {loading && (
          <div className="text-center text-gray-500">
            <Loading />
          </div>
        )}

        {!loading && products.length === 0 && selectedCategory && (
          <p className="text-center text-gray-500">No products found.</p>
        )}

        <div className="grid grid-cols-1 rounded-md sm:grid-cols-2 mb-4 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularProductPagination.map((product, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between border p-4 rounded shadow hover:shadow-lg transition h-full"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className="w-full h-full object-cover rounded"
              />

              <h3 className="font-semibold mt-2 text-black">{product.name}</h3>

              <p className="mt-1 font-bold text-black">৳{product.price}</p>
              <p className="text-xs text-gray-500">Weight: {product.weight}</p>
              <p className="text-xs text-gray-500">
                {" "}
                <Rating value={Number(product.rating)} />
              </p>
              <div className="text-center  mt-4 w-full">
                <Link
                  href={`/user/popularCategory/popularCategoryDetails/${product._id}`}
                >
                  <button className="mt-4 text-sm flex items-center justify-center gap-2 font-semibold text-white bg-blue-500 hover:bg-blue-600 transition duration-200 py-2 px-4 rounded-xl w-full">
                    <AiOutlineEye className="text-xl" />
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="mt-8 flex justify-center space-x-2">
            <button
              onClick={() => handlePaginationChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPage)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePaginationChange(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-700 text-white"
                    : "bg-white text-blue-500 border border-blue-500"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePaginationChange(currentPage + 1)}
              disabled={currentPage === totalPage}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </section>

      {/* Brand Marquee */}
      <div className="mt-10 px-4">
        <h1 className="text-xl font-bold text-center text-black">
          Popular On Kenakata
        </h1>
        <Marquee>
          <div className="flex products-center gap-6 px-4 py-4">
            {[pran, rekit, nestle, unilivers, godrej, cokakola, megi].map(
              (img, idx) => (
                <div key={idx} className="flex-shrink-0">
                  <Image
                    src={img}
                    alt={`brand-${idx}`}
                    height={60}
                    width={60}
                    className="object-contain sm:h-[70px] sm:w-[70px]"
                  />
                </div>
              )
            )}
          </div>
        </Marquee>
      </div>
    </div>
  );
}
