"use client";

import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "@/app/redux/features/counter/counterSlice";
import { RootState } from "@/app/redux/store";

const TAX_RATE = 0.05;
const COMMISSION_RATE = 0.1;

const AllProductDetails = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const getQuantity = (id: string) => {
    return cartItems.find((item) => item._id === id)?.quantity || 0;
  };

  const getPrice = (id: string, unitPrice: string) => {
    const quantity = getQuantity(id);
    return parseFloat(unitPrice) * quantity;
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + getPrice(item._id, item.price),
    0
  );
  const tax = subtotal * TAX_RATE;
  const commission = subtotal * COMMISSION_RATE;
  const total = subtotal + tax + commission;

  if (cartItems.length === 0) {
    return (
      <p className="text-center text-red-500">No products found in cart</p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-center text-gray-800">
        All Cart Product Details
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Section: Product Grid */}
        <div className="w-full md:w-2/3 min-h-[400px]">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center p-8 border rounded shadow bg-white">
              <Image
                src="https://i.ibb.co/XfMZMJXk/empty-Shopping-Bag.webp" // Replace with your actual image path
                alt="Empty Cart"
                width={300}
                height={200}
                className="mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-4">
                Add products to see them here!
              </p>
              <Link href="/">
                <button className="bg-blue-600 hover:bg-blue-700  px-5 py-2 rounded shadow font-medium text-black">
                  Go to Home
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {cartItems.map((product) => {
                const quantity = getQuantity(product._id);
                const totalPrice = getPrice(product._id, product.price);

                return (
                  <div
                    key={product._id}
                    className="border p-4 rounded shadow bg-white flex flex-col"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={500}
                      height={300}
                      className="w-full h-60 object-cover rounded"
                    />
                    <h2 className="text-xl font-semibold mt-4 text-gray-800">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {product.description}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Category: {product.category}
                    </p>
                    <p className="text-sm text-gray-500">
                      Weight: {product.weight}
                    </p>

                    <div className="flex items-center mt-3 gap-3">
                      <button
                        onClick={() => {
                          if (quantity > 1)
                            dispatch(decrementQuantity(product._id));
                        }}
                        disabled={quantity <= 1}
                        className={`px-3 py-1 rounded ${
                          quantity <= 1
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gray-200 text-black"
                        }`}
                      >
                        -
                      </button>
                      <span className="text-lg font-medium">{quantity}</span>
                      <button
                        onClick={() => dispatch(incrementQuantity(product._id))}
                        className="px-3 py-1 bg-gray-200 text-black rounded"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex justify-between mt-4 text-black font-semibold">
                      <span>Total Price:</span>
                      <span>৳{totalPrice.toFixed(2)}</span>
                    </div>

                    <button
                      onClick={() => dispatch(removeFromCart(product._id))}
                      className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded shadow"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Section: Summary */}
        {cartItems.length > 0 && (
          <div className="w-full md:w-1/3 h-fit border p-6 rounded shadow-lg bg-white">
            <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
              Summary
            </h3>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Subtotal:</span>
                <span>৳{subtotal.toFixed(2)}</span>
              </li>
              <li className="flex justify-between">
                <span>Tax (5%):</span>
                <span>৳{tax.toFixed(2)}</span>
              </li>
              <li className="flex justify-between">
                <span>Commission (10%):</span>
                <span>৳{commission.toFixed(2)}</span>
              </li>
              <li className="flex justify-between font-bold border-t pt-2 text-black">
                <span>Total:</span>
                <span>৳{total.toFixed(2)}</span>
              </li>
            </ul>

            <Link href="/user/checkout">
              <button className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded shadow">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProductDetails;
