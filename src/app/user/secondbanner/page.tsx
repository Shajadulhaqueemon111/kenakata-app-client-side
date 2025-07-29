"use client";

import { CarIcon, HandCoins, ShoppingBag } from "lucide-react";
import { GiTakeMyMoney } from "react-icons/gi";
import React from "react";

const features = [
  {
    icon: <ShoppingBag className="w-8 h-8 text-red-500" />,
    title: "+15,000 products",
    description: "to shop from",
  },
  {
    icon: <HandCoins className="w-8 h-8 text-green-600" />,
    title: "Pay after delivery",
    description: "Pay only after receiving products",
  },
  {
    icon: <CarIcon className="w-8 h-8 text-blue-600" />,
    title: "Super fast delivery",
    description: "Get your delivery within 1 hour",
  },
  {
    icon: <GiTakeMyMoney className="w-8 h-8 text-purple-600" />,
    title: "Exciting Offers",
    description: "Get offers that save money",
  },
];

const SecondBanner = () => {
  return (
    <div className="px-4 sm:px-6 md:px-8 py-8 sm:py-10 bg-amber-50">
      <h2 className="text-xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-800">
        Why Shop with <span className="text-red-500">Kenakata?</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 p-4 sm:p-6 bg-white shadow rounded-lg hover:shadow-md transition duration-200"
          >
            <div className="flex-shrink-0">{item.icon}</div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-800">
                {item.title}
              </h4>
              <p className="text-sm sm:text-base text-gray-600">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecondBanner;
