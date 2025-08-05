/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";

import publicAxios from "@/axiosInstance/publicaxios";

import Image from "next/image";

import Loading from "../loading";
import VegitablesBanner from "./freshvegetablesbanner";
import { useSearch } from "@/context/SearchContext";

import Rating from "@/components/Reating/Rating";
import Link from "next/link";
import { AiOutlineEye } from "react-icons/ai";

const FreshVegetables = () => {
  const [grosary, setGrosary] = useState([]);
  const [loading, setLoading] = useState(false);
  const { query } = useSearch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await publicAxios.get("/grosary-product");
        const productData = res.data?.data || [];

        const fruitsOnly = productData.filter(
          (item: any) => item.category.toLowerCase() === "vegetables"
        );

        setGrosary(fruitsOnly);
      } catch (err) {
        console.error("Error fetching fruits:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const filteredVegetables = grosary.filter((item: any) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div>
      <VegitablesBanner />
      <div className="mt-4">
        <div className="mt-4 mb-4">
          <h1 className="text-xl font-bold text-center">Fresh Vegitables</h1>
        </div>
        {loading ? (
          <div className="text-center text-gray-500">
            <Loading></Loading>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 mb-4 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            {filteredVegetables.map((item: any) => (
              <div
                key={item._id}
                className="flex flex-col justify-between border p-4 rounded shadow hover:shadow-lg transition h-full"
              >
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
                <p className="text-xs text-gray-500">
                  {" "}
                  <Rating value={Number(item.rating)} />
                </p>
                <div className="text-center  mt-4">
                  <Link href={`/user/freshvegetables/${item._id}`}>
                    <button className="mt-4 text-sm flex items-center justify-center gap-2 font-semibold text-white bg-blue-500 hover:bg-blue-600 transition duration-200 py-2 px-4 rounded-xl w-full">
                      <AiOutlineEye className="text-xl" />
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FreshVegetables;
