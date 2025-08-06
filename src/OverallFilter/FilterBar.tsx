/* eslint-disable @typescript-eslint/no-explicit-any */
// components/FilterBar.tsx
"use client";

import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";

import publicAxios from "@/axiosInstance/publicaxios";

const FilterBar = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedPrice,
    setSelectedPrice,
  } = useFilter();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await publicAxios.get("/offer");
        console.log(res);
        const products: { category: string }[] = res.data.data;

        const uniqueCategories = Array.from(
          new Set(products.map((p: any) => p.category))
        ).filter((c) => typeof c === "string" && c.trim().length > 0);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8 text-black">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border px-4 py-2 rounded-md"
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>

      <select
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All Prices</option>
        <option value="low">Below ৳50</option>
        <option value="mid">৳50 - ৳100</option>
        <option value="high">Above ৳100</option>
      </select>
    </div>
  );
};

export default FilterBar;
