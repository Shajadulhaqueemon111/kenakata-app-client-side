/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MdDelete, MdEdit, MdPrint } from "react-icons/md";
import moment from "moment";
import Image from "next/image";
import authAxiosInstance from "@/axiosInstance/authaxios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Link from "next/link";

export type TOrderProduct = {
  _id: string;
  name: string;
  category: string;
  price: string;
  weight: string;
  description?: string;
  image?: string;
  quantity: number;
};

const ViewAllOrders = () => {
  const [orders, setOrders] = useState<TOrderProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await authAxiosInstance.get(
          `/order/get-all-order-details?page=${currentPage}&limit=${pageSize}`
        );

        setOrders(response.data.data);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    fetchOrders();
  }, [currentPage]);

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
        const res = await authAxiosInstance.delete(`/order/${_id}`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        if (res.status === 200 || res.status === 204) {
          Swal.fire("Deleted!", "Order has been deleted.", "success");
          setOrders((prevOrders) =>
            prevOrders.filter((order) => order._id !== _id)
          );
        } else {
          toast.error("Failed to delete order.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Order deletion failed!");
      }
    } else {
      toast("Delete action cancelled.");
    }
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 mt-6">
        All Orders
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
            <tr>
              <th className="px-5 py-3 text-left">User</th>
              <th className="px-5 py-3 text-left">Products</th>
              <th className="px-5 py-3 text-left">Total</th>
              <th className="px-5 py-3 text-left">Status</th>
              <th className="px-5 py-3 text-left">Transaction</th>
              <th className="px-5 py-3 text-left">Date</th>
              <th className="px-5 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 divide-y divide-gray-200">
            {orders.map((order: any) => (
              <tr key={order._id} className="hover:bg-gray-50">
                {/* User Info */}
                <td className="px-5 py-4 align-top">
                  <p className="font-medium">{order.user.name}</p>
                  <p className="text-xs text-gray-500">{order.user.email}</p>
                  <p className="text-xs text-gray-500">{order.user.phone}</p>
                  <p className="text-xs text-gray-500">{order.user.address}</p>
                </td>

                {/* Product Info */}
                <td className="px-5 py-4">
                  {order.products.map((item: any, idx: number) => (
                    <div key={idx} className="mb-3">
                      <p className="font-semibold text-sm">
                        {item.product.name} × {item.quantity}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.product.category}, {item.product.weight}
                      </p>
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={60}
                        height={40}
                        className="rounded mt-1"
                      />
                    </div>
                  ))}
                </td>

                {/* Total */}
                <td className="px-5 py-4 font-bold text-gray-800">
                  ৳{order.totalPrice}
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <p>
                    <span className="font-medium text-gray-700">Order:</span>{" "}
                    <span className="text-blue-600">{order.status}</span>
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Payment:</span>{" "}
                    <span className="text-green-600">
                      {order.paymentStatus}
                    </span>
                  </p>
                </td>

                {/* Transaction */}
                <td className="px-5 py-4 text-xs font-bold">
                  {order.transactionId}
                </td>

                {/* Date */}
                <td className="px-5 py-4 text-xs text-gray-500">
                  {moment(order.createdAt).format("DD MMM YYYY, h:mm A")}
                </td>

                {/* Actions */}
                <td className="px-5 py-4 space-y-2">
                  <Link href={`/dashboard/updateorderstatus/${order._id}`}>
                    <Button
                      variant="outline"
                      className="w-full flex items-center gap-2"
                    >
                      <MdEdit className="text-blue-500" /> Update
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleDelete(order._id)}
                    variant="destructive"
                    className="w-full flex items-center gap-2 mt-3"
                  >
                    <MdDelete className="text-white" /> Delete
                  </Button>
                  <Link href={`/dashboard/dwonloadInvoice/${order._id}`}>
                    <Button
                      variant="secondary"
                      className="w-full flex items-center gap-2"
                    >
                      <MdPrint className="text-gray-700" /> Invoice
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-6 space-x-4">
        <Button
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          Previous
        </Button>
        <span className="px-4 py-2 bg-white border rounded">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ViewAllOrders;
