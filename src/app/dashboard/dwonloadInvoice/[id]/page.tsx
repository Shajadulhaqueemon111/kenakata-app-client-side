/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import authAxiosInstance from "@/axiosInstance/authaxios";
import DwonLoadInvioce from "./DwonLoadInvioce";

const InvoicePage = () => {
  const params = useParams();
  const id = params?.id as string;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await authAxiosInstance.get(
          `/order/get-single-order-details/${id}`
        );
        setOrder(response.data.data);
      } catch (error) {
        console.error("Failed to fetch order", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrder();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!order)
    return <p className="text-center text-red-500 mt-10">Order not found</p>;

  return <DwonLoadInvioce order={order} />;
};

export default InvoicePage;
