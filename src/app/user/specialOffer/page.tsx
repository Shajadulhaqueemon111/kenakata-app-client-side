"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { addToCart } from "@/app/redux/features/counter/counterSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "@/context/SearchContext";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { useDispatch } from "react-redux";

type OfferProduct = {
  id: string;
  name: string;
  category: string;
  price: string;
  weight: string;
  description: string;
  image: string;
  offerPercent: number;
};

const SpecialOffer = () => {
  const [offerProduct, setOfferProduct] = useState<OfferProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { query } = useSearch();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOfferProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/offerproduct.json");
        setOfferProduct(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOfferProduct();
  }, []);

  const filterOfferProduct = offerProduct.filter((offer) =>
    offer.name.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) {
    return <Skeleton />;
  }

  if (!filterOfferProduct.length) {
    return (
      <div className="text-black text-center mt-10">Product not found</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">
        Special Offers
      </h2>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filterOfferProduct.map((offer) => (
          <div
            key={offer.id}
            className="flex flex-col justify-between border p-4 rounded-2xl shadow hover:shadow-xl transition duration-300 bg-white"
          >
            <Image
              src={offer.image}
              alt={offer.name}
              width={300}
              height={200}
              className="w-full h-full object-cover rounded-xl"
            />

            <h3 className="font-semibold mt-3 text-lg text-black">
              {offer.name}
            </h3>

            <p className="text-sm text-gray-600 mt-1  overflow-hidden">
              {offer.description}
            </p>

            <p className="mt-2 font-bold text-black text-base">
              ৳{offer.price}
            </p>
            <p className="text-xs text-gray-500">Weight: {offer.weight}</p>
            <p className="text-xs text-green-600 font-medium">
              {offer.offerPercent}% OFF
            </p>

            <button
              //   onClick={() => dispatch(addToCart(offer))}
              className="mt-4 text-sm flex items-center justify-center gap-2 font-semibold text-white bg-red-500 hover:bg-red-600 transition duration-200 py-2 px-4 rounded-xl w-full"
            >
              <TiShoppingCart className="text-xl" />
              Add to Bag
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffer;
