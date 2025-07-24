/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import FruitesBanner from "./fruitsbanner/page";
import publicAxios from "@/axiosInstance/publicaxios";

import Image from "next/image";
import { TiShoppingCart } from "react-icons/ti";
import Loading from "../loading";

const FreshFruites = () => {
  const [grosary, setGrosary] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await publicAxios.get("/grosary-product");
        const productData = res.data?.data || [];

        const fruitsOnly = productData.filter(
          (item: any) => item.category.toLowerCase() === "fruits"
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

  return (
    <div>
      <FruitesBanner />
      <div className="mt-4">
        <div className="mt-4 mb-4">
          <h1 className="text-xl font-bold text-center">Fresh Fruites</h1>
        </div>
        {loading ? (
          <div className="text-center text-gray-500">
            <Loading></Loading>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 mb-4 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {grosary.map((item: any) => (
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

                <div className="text-center mx-auto mt-4">
                  <button className="text-sm flex gap-2 font-semibold text-red-500 py-2 px-4 w-full border border-red-300 rounded">
                    <TiShoppingCart className="text-center text-xl  " />
                    Add to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FreshFruites;
