"use client";
import { CarIcon, HandCoins, ShoppingBag } from "lucide-react";
import { GiTakeMyMoney } from "react-icons/gi";
import React from "react";

const features = [
  {
    icon: <ShoppingBag className="w-6 h-6 text-red-500" />,
    title: "+15,000 products",
    description: "to shop from",
  },
  {
    icon: <HandCoins className="w-6 h-6 text-green-600" />,
    title: "Pay after delivery",
    description: "Pay only after receiving products",
  },
  {
    icon: <CarIcon className="w-6 h-6 text-blue-600" />,
    title: "Super fast delivery",
    description: "Get your delivery within 1 hour",
  },
  {
    icon: <GiTakeMyMoney className="w-6 h-6 text-purple-600" />,
    title: "Exciting Offers",
    description: "Get offers that save money",
  },
];

const SecondBanner = () => {
  return (
    <div className="px-4 py-10 bg-amber-50">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Why Shop with <span className="text-red-500">Kenakata?</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-6 bg-white shadow rounded-lg transition hover:shadow-md"
          >
            <div className="flex-shrink-0">{item.icon}</div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecondBanner;
