"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, X, Plus, Minus, Trash } from "lucide-react";
import { RootState } from "@/app/redux/store";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/app/redux/features/counter/counterSlice";
import Image from "next/image";
import Link from "next/link";

const FloatingCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* Floating Cart Button */}
      <div
        className="fixed top-1/2 -translate-y-1/2 right-6 z-[9999] cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center shadow-xl transition-all">
            <ShoppingCart className="text-black" size={28} />
          </div>
          {totalItems > 0 && (
            <h1 className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {totalItems}
            </h1>
          )}
        </div>
      </div>

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-[9998] transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6 text-black" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-120px)]">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-sm">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="mb-4 border-b pb-2 flex flex-col gap-2"
              >
                <div className="flex items-center gap-3 text-black">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-md object-cover border"
                  />

                  <div>
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.category}</p>
                    <p className="text-sm font-semibold">৳ {item.price}</p>

                    <div className="flex items-center mt-1 gap-2">
                      <button
                        onClick={() => dispatch(decrementQuantity(item._id))}
                        className="bg-gray-200 px-2 rounded"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(incrementQuantity(item._id))}
                        className="bg-gray-200 px-2 rounded"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  {/* <Link
                    href={`/user/viewdetails/${item._id}`}
                    className="text-blue-500 hover:underline text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    View Details
                  </Link> */}

                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 border-t">
            <Link
              href="/user/viewdetails"
              className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-medium"
              onClick={() => setIsOpen(false)}
            >
              View All Details
            </Link>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-[9997]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default FloatingCart;
