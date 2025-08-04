"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

const FreshProducts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !(menuRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-black font-semibold px-4 py-2 hover:text-amber-500 transition duration-200"
      >
        Fresh Products
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg w-64 z-50 border border-gray-200">
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/user/freshfruites"
                  className="block text-gray-700 hover:text-amber-500 font-medium transition duration-200"
                >
                  🍎 Fresh Fruits
                </Link>
              </li>
              <li>
                <Link
                  href="/user/freshvegetables"
                  className="block text-gray-700 hover:text-amber-500 font-medium transition duration-200"
                >
                  🥦 Fresh Vegetables
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreshProducts;
