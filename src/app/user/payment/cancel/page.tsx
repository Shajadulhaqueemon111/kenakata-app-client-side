"use client";
import React from "react";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const PaymentCancelPage = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center">
        <XCircle className="text-red-500 mx-auto mb-4" size={60} />
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">
          Payment Cancelled
        </h2>
        <p className="text-gray-600 mb-6">
          Your payment has been cancelled. If this was a mistake, you can try
          again or return to the homepage.
        </p>
        <button
          onClick={handleBackToHome}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentCancelPage;
