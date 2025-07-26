"use client";

import React, { useState } from "react";
import authAxiosInstance from "@/axiosInstance/authaxios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

const STATUS_OPTIONS = ["Pending", "Paid", "Shipped", "Completed", "Cancelled"];

const UpdateStatus = () => {
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const handleStatusChange = async () => {
    setLoading(true);
    try {
      console.log("Sending update for ID:", id);
      console.log("New status:", status);
      await authAxiosInstance.patch(`/order/${id}`, {
        status,
      });

      toast.success("Order status updated successfully");
      router.push("/dashboard/viewallorders");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update order status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Update Order Status</h2>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded px-3 py-2 mb-4 w-full"
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <button
        onClick={handleStatusChange}
        disabled={loading}
        className={`w-full px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Updating..." : "Update Status"}
      </button>
    </div>
  );
};

export default UpdateStatus;
