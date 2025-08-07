"use client";

import publicAxios from "@/axiosInstance/publicaxios";
import Rating from "@/components/Reating/Rating";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "@/context/SearchContext";
import FilterBar from "@/OverallFilter/FilterBar";
import { useFilter } from "@/OverallFilter/FilterContext";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";

type OfferProduct = {
  _id: string;
  name: string;
  category: string;
  price: string;
  weight: string;
  description: string;
  image: string;
  rating: string;
  offerPercent: number;
};

const SpecialOffer = () => {
  const [offerProduct, setOfferProduct] = useState<OfferProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { query } = useSearch();

  const { selectedCategory, selectedPrice } = useFilter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 8;

  useEffect(() => {
    const fetchOfferProduct = async () => {
      setLoading(true);
      try {
        const response = await publicAxios.get("/offer");
        setOfferProduct(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOfferProduct();
  }, []);

  const filterOfferProduct = offerProduct.filter((offer) => {
    const nameMatch = offer.name.toLowerCase().includes(query.toLowerCase());
    const categoryMatch =
      selectedCategory === "all" || offer.category === selectedCategory;

    const price = parseFloat(offer.price);
    const priceMatch =
      selectedPrice === "all" ||
      (selectedPrice === "low" && price < 50) ||
      (selectedPrice === "mid" && price >= 50 && price <= 100) ||
      (selectedPrice === "high" && price > 100);

    return nameMatch && categoryMatch && priceMatch;
  });

  const totalPage = Math.ceil(filterOfferProduct.length / itemPerPage);
  const OfferProductPagination = filterOfferProduct.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );

  const handlePaginationChange = (page: number) => {
    if (page < 1 || page > totalPage) return;
    setCurrentPage(page);
  };

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">
        Special Offers
      </h2>

      <FilterBar />

      {filterOfferProduct.length === 0 ? (
        <div className="text-black text-center mt-10">Product not found</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {OfferProductPagination.map((offer) => (
              <div
                key={offer._id}
                className="relative flex flex-col justify-between border p-4 rounded-2xl shadow hover:shadow-xl transition duration-300 bg-white"
              >
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                  {offer.offerPercent}% OFF
                </div>

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

                <div className="mt-2">
                  <p className="text-sm text-gray-500 line-through">
                    ৳{offer.price}
                  </p>
                  <p className="text-base font-bold text-green-600">
                    ৳
                    {(
                      parseFloat(offer.price) -
                      (parseFloat(offer.price) * offer.offerPercent) / 100
                    ).toFixed(0)}
                  </p>
                </div>

                <p className="text-xs text-gray-500">Weight: {offer.weight}</p>
                <p className="text-xs text-gray-500">
                  <Rating value={Number(offer.rating)} />
                </p>

                <div>
                  <Link
                    href={`/user/specialOffer/offerDetailspage/${offer._id}`}
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

          {/* Pagination */}
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
        </>
      )}
    </div>
  );
};

export default SpecialOffer;
