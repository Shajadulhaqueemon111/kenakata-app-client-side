/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import publicAxios from "@/axiosInstance/publicaxios";
import React, { useEffect, useState } from "react";
import Loading from "../loading";
import Image from "next/image";
import { TiShoppingCart } from "react-icons/ti";
import { useSearch } from "@/context/SearchContext";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/redux/features/counter/counterSlice";
import AllFreshFruitsAndVegetableBanner from "./allfruitsandvegitableBanner";

const ITEMS_PER_PAGE = 8;

const ProductCard = ({ item, dispatch }: { item: any; dispatch: any }) => (
  <div className="flex flex-col justify-between border p-4 rounded shadow hover:shadow-lg transition h-full bg-white">
    <Image
      src={item.image}
      alt={item.name}
      width={300}
      height={200}
      className="w-full h-[200px] object-cover rounded"
    />
    <h3 className="font-semibold mt-2 text-black">{item.name}</h3>
    <p className="text-sm text-gray-600 h-[48px] overflow-hidden">
      {item.description}
    </p>
    <p className="mt-1 font-bold text-black">৳{item.price}</p>
    <p className="text-xs text-gray-500">Weight: {item.weight}</p>
    <div className="text-center mx-auto mt-4">
      <button
        onClick={() => dispatch(addToCart(item))}
        className="mt-4 text-sm flex items-center justify-center gap-2 font-semibold text-white bg-red-500 hover:bg-red-600 transition duration-200 py-2 px-4 rounded-xl w-full"
      >
        <TiShoppingCart className="text-xl" />
        Add to Bag
      </button>
    </div>
  </div>
);

const AllFreshFruitsAndVegetable = () => {
  const [fruits, setFruits] = useState<any[]>([]);
  const [vegetables, setVegetables] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { query } = useSearch();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await publicAxios.get("/grosary-product");
        const productData = res.data?.data || [];

        const fruitsOnly = productData.filter(
          (item: any) => item.category.toLowerCase() === "fruits"
        );
        const vegetablesOnly = productData.filter(
          (item: any) => item.category.toLowerCase() === "vegetables"
        );

        setFruits(fruitsOnly);
        setVegetables(vegetablesOnly);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const combined = [...fruits, ...vegetables];

  const totalPages = Math.ceil(combined.length / ITEMS_PER_PAGE);

  const paginate = (items: any[], page: number) =>
    items.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const currentItems = paginate(combined, currentPage);

  const currentFruits = currentItems.filter(
    (item) => item.category.toLowerCase() === "fruits"
  );
  const currentVegetables = currentItems.filter(
    (item) => item.category.toLowerCase() === "vegetables"
  );
  const filterfruites = currentFruits.filter((item: any) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  const filtervegetables = currentVegetables.filter((item: any) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="px-4 sm:px-8 py-6">
      <div>
        <AllFreshFruitsAndVegetableBanner />
      </div>
      <h1 className="text-2xl font-bold text-center mb-6">
        All Fresh Fruits and Vegetables
      </h1>

      {loading ? (
        <div className="text-center text-gray-500">
          <Loading />
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold my-4 text-center text-green-600">
            Fresh Fruits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
            {currentFruits.length > 0 ? (
              filterfruites.map((item) => (
                <ProductCard key={item._id} item={item} dispatch={dispatch} />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No fruits in this page.
              </p>
            )}
          </div>

          <h2 className="text-xl font-bold my-4 text-center text-lime-700">
            Fresh Vegetables
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
            {currentVegetables.length > 0 ? (
              filtervegetables.map((item) => (
                <ProductCard key={item._id} item={item} dispatch={dispatch} />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No vegetables in this page.
              </p>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-4 py-2 text-sm font-medium border rounded ${
                    currentPage === idx + 1
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllFreshFruitsAndVegetable;
