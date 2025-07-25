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
import FishMeatsbanner from "./fishmeatsbanner";

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
        className="text-sm flex gap-2 font-semibold text-red-500 py-2 px-4 w-full border border-red-300 rounded"
      >
        <TiShoppingCart className="text-xl" />
        Add to Bag
      </button>
    </div>
  </div>
);

const AllFreshMeatAndFish = () => {
  const [fish, setFish] = useState<any[]>([]);
  const [meats, setMeats] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { query } = useSearch();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const filteredFish = fish.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  const filteredMeats = meats.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  const combined = [...filteredFish, ...filteredMeats];
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);
  const totalPages = Math.ceil(combined.length / ITEMS_PER_PAGE);

  const paginate = (items: any[], page: number) =>
    items.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const currentItems = paginate(combined, currentPage);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await publicAxios.get("/grosary-product");
        const productData = res.data?.data || [];

        const MeatOnly = productData.filter(
          (item: any) => item.category.toLowerCase() === "meat"
        );
        const FishOnly = productData.filter(
          (item: any) => item.category.toLowerCase() === "fish"
        );

        setFish(FishOnly);
        setMeats(MeatOnly);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-4 sm:px-8 py-6">
      <div>
        <FishMeatsbanner />
      </div>
      <h1 className="text-2xl font-bold text-center mb-6 mt-2 text-black">
        Fresh Fish and Meats
      </h1>

      {loading ? (
        <div className="text-center text-gray-500">
          <Loading />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
            {currentItems.map((item) => (
              <ProductCard key={item._id} item={item} dispatch={dispatch} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-4 py-2 text-sm font-medium border rounded ${
                    currentPage === idx + 1
                      ? "bg-red-600 text-white"
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

export default AllFreshMeatAndFish;
