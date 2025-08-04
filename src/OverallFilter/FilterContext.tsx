"use client";
import React, { createContext, useContext, useState } from "react";

type FilterContextType = {
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  selectedPrice: string;
  setSelectedPrice: (val: string) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");

  return (
    <FilterContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedPrice,
        setSelectedPrice,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error("useFilter must be used inside FilterProvider");
  return context;
};
