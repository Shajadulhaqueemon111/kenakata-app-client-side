"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Link from "next/link";
import Swal from "sweetalert2";
import publicAxios from "@/axiosInstance/publicaxios";
import Image from "next/image";
import authAxiosInstance from "@/axiosInstance/authaxios";

type Tuser = {
  _id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  weight: string;
  description: string;
};

const ProductList = () => {
  const [products, setProduct] = useState<Tuser[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination stateF
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Access token does not exist in local storage");
        setLoading(false);
        return;
      }

      try {
        const res = await publicAxios.get("/grosary-product");
        setProduct(res.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-blue-500 animate-spin"></div>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentUsers = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (_id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Access token does not exist in local storage");
        return;
      }

      try {
        const res = await authAxiosInstance.delete(`/grosary-product/${_id}`);

        if (res.status === 200 || res.status === 204) {
          Swal.fire("Deleted!", "User has been deleted.", "success");
          setProduct((previousUser) =>
            previousUser.filter((user) => user._id !== _id)
          );

          // Optional: If current page becomes empty after deletion, go back a page
          if (currentUsers.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        } else {
          toast.error("Failed to delete user.");
        }
      } catch (err) {
        console.error(err);
        toast.error("User deletion failed!");
      }
    } else {
      toast("Delete action cancelled.");
    }
  };

  return (
    <div className="p-4 mx-auto items-center min-h-screen max-w-6xl">
      <h1 className="text-xl font-bold mb-4 text-center">All Product</h1>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full table-auto border-collapse bg-white">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
              <th className="border-b px-6 py-3">#</th>
              <th className="border-b px-6 py-3">Image</th>
              <th className="border-b px-6 py-3">Name</th>
              <th className="border-b px-6 py-3">category</th>
              <th className="border-b px-6 py-3">Price</th>
              <th className="border-b px-6 py-3">weaight</th>
              <th className="border-b px-6 py-3 text-center">Update</th>
              <th className="border-b px-6 py-3 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((product, index) => (
              <tr
                key={product._id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="border-t px-6 py-4">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>

                <td className="border-t px-6 py-4">
                  <Image src={product.image} alt="" height={40} width={40} />
                </td>
                <td className="border-t px-6 py-4">{product.name}</td>
                <td className="border-t px-6 py-4">{product.category}</td>
                <td className="border-t px-6 py-4">{product.price}</td>
                <td className="border-t px-6 py-4 capitalize">
                  {product.weight}
                </td>
                <td className="border-t px-6 py-4 text-center">
                  <Link
                    href={`/dashboard/productlist/updateproduct/${product._id}`}
                  >
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
                      Update
                    </button>
                  </Link>
                </td>
                <td className="border-t px-6 py-4 text-center">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 border rounded ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
            } hover:bg-blue-500 hover:text-white transition`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
