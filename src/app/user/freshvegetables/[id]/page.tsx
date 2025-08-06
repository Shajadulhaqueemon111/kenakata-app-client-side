"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { TiShoppingCart } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/redux/features/counter/counterSlice";
import Rating from "@/components/Reating/Rating";

import publicAxios from "@/axiosInstance/publicaxios";
import Link from "next/link";
import Loading from "../../loading";

type Product = {
  _id: string;
  name: string;
  category: string;
  price: string;
  weight: string;
  description: string;
  image: string;
  rating: string;
  model: string;
};

const FreshVegitableDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await publicAxios.get(`/grosary-product/${id}`);
        setProduct(res.data.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-black">
        <Loading />{" "}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-10 text-black">Product not found</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow">
        {/* Left: Image */}
        <div className="flex justify-center items-center">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="rounded-xl object-cover"
          />
        </div>

        <div className="flex flex-col justify-center text-black">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-sm text-gray-500 mb-2">
            Category: {product.category}
          </p>
          <p className="text-sm text-gray-500 mb-2">Weight: {product.weight}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>

          <div className="mb-4">
            <p className="text-gray-500 text-sm line-through">
              ৳{product.price}
            </p>
            <p className="text-2xl font-bold text-green-600">
              ৳{product.price}
            </p>
          </div>

          <div className="mb-4">
            <Rating value={Number(product.rating)} />
          </div>

          <button
            onClick={() =>
              dispatch(addToCart({ ...product, model: "grosaryproduct" }))
            }
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg transition text-sm md:text-base w-fit"
          >
            <TiShoppingCart className="text-xl" />
            Add to Bag
          </button>
        </div>
      </div>
      <div className="mt-12 text-center text-black bg-gray-100 py-10 rounded-lg shadow-inner">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Your Satisfaction, Our Priority
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-6">
          We are committed to delivering the freshest and highest quality
          products directly to your doorstep. Let us know how were doing!
        </p>

        <Link href="/user/feedback">
          <button className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
            Leave Feedback
          </button>
        </Link>

        <div className="mt-8 max-w-xl mx-auto text-gray-500 text-sm italic">
          “Fresh meat and fish,vegitables,fruits,cooking responsibly sourced.
          Trust us to feed your family the best nature has to offer.”
        </div>
      </div>
    </div>
  );
};

export default FreshVegitableDetails;
