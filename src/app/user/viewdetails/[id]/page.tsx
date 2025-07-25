/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import publicAxios from "@/axiosInstance/publicaxios";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  addToCart,
} from "@/app/redux/features/counter/counterSlice";
import { RootState } from "@/app/redux/store";
import Link from "next/link";
import Loading from "../../loading";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const TAX_RATE = 0.05;
  const COMMISSION_RATE = 0.1;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await publicAxios("/grosary-product");
        const allProducts = res.data.data;
        const found = allProducts.find((p: any) => p._id === id);
        setProduct(found || null);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const cartItem = cartItems.find((item) => item._id === id);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  const handleRemove = () => dispatch(removeFromCart(id as string));
  const handleIncrease = () => dispatch(incrementQuantity(id as string));
  const handleDecrease = () => dispatch(decrementQuantity(id as string));

  const quantity = cartItem?.quantity || 0;
  const basePrice = parseFloat(product?.price || "0") * quantity;
  const tax = basePrice * TAX_RATE;
  const commission = basePrice * COMMISSION_RATE;
  const total = basePrice + tax + commission;

  if (loading)
    return (
      <div className="text-center">
        <Loading />
      </div>
    );
  if (!product) return <p className="text-center text-red-500">Not Found</p>;

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 max-w-6xl mx-auto">
      <div className="flex-1">
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={400}
          className="rounded shadow-md w-full object-cover"
        />
        <h2 className="text-2xl font-bold mt-4 text-black">{product.name}</h2>
        <p className="text-gray-700 mt-2">{product.description}</p>
        <p className="text-gray-600 mt-1">
          <strong>Category:</strong> {product.category}
        </p>
        <p className="text-gray-600">
          <strong>Weight:</strong> {product.weight}
        </p>

        {quantity > 0 ? (
          <div className="flex items-center mt-4 gap-4">
            <button
              onClick={handleDecrease}
              className="px-3 py-1 bg-gray-200 text-black rounded"
            >
              -
            </button>
            <span className="text-lg font-medium">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="px-3 py-1 bg-gray-200 text-black rounded"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="mt-4 bg-yellow-500 text-black font-semibold px-4 py-2 rounded"
          >
            Add to Cart
          </button>
        )}

        <p className="text-xl mt-4 font-semibold text-green-600">
          ৳{(parseFloat(product.price) * (quantity || 1)).toFixed(2)}
        </p>
      </div>

      {/* Sidebar Summary */}
      <div className="w-full md:w-80 border p-4 rounded shadow-lg bg-white h-fit">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Summary</h3>

        {quantity > 0 ? (
          <>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex justify-between">
                <span>Base Price:</span>
                <span>৳{basePrice.toFixed(2)}</span>
              </li>
              <li className="flex justify-between">
                <span>Tax (5%):</span>
                <span>৳{tax.toFixed(2)}</span>
              </li>
              <li className="flex justify-between">
                <span>Commission (10%):</span>
                <span>৳{commission.toFixed(2)}</span>
              </li>
              <hr />
              <li className="flex justify-between font-bold text-black border-t pt-2">
                <span>Total:</span>
                <span>৳{total.toFixed(2)}</span>
              </li>
            </ul>

            <Link href={`/user/checkout/${id}`}>
              <button className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded shadow">
                Checkout
              </button>
            </Link>

            <button
              onClick={handleRemove}
              className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded shadow"
            >
              Remove
            </button>
          </>
        ) : (
          <p className="text-center text-gray-500">No item in cart</p>
        )}
      </div>
    </div>
  );
}
