"use client";

import React from "react";
import jsPDF from "jspdf";

type TOrder = {
  _id: string;
  user: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  products: {
    product: {
      _id: string;
      name: string;
      category: string;
      weight: string;
    };
    quantity: number;
  }[];
  totalPrice: number;
  paymentStatus: string;
  status: string;
  transactionId: string;
  createdAt: string;
};

const DwonLoadInvioce = ({ order }: { order: TOrder }) => {
  const handleDownload = () => {
    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(16);
    doc.text("Invoice", 90, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Order ID: ${order._id}`, 10, y);
    y += 6;
    doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`, 10, y);
    y += 6;
    doc.text(`Status: ${order.status}`, 10, y);
    y += 6;
    doc.text(`Payment: ${order.paymentStatus}`, 10, y);
    y += 6;
    doc.text(`Transaction ID: ${order.transactionId}`, 10, y);
    y += 10;

    doc.text("Customer Info:", 10, y);
    y += 6;
    doc.text(`Name: ${order.user.name}`, 10, y);
    y += 6;
    doc.text(`Email: ${order.user.email}`, 10, y);
    y += 6;
    doc.text(`Phone: ${order.user.phone}`, 10, y);
    y += 6;
    doc.text(`Address: ${order.user.address}`, 10, y);
    y += 10;

    doc.text("Products:", 10, y);
    y += 6;
    order.products.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.product.name} × ${item.quantity}`, 10, y);
      y += 6;
      doc.text(
        `   Category: ${item.product.category}, Weight: ${item.product.weight}`,
        10,
        y
      );
      y += 8;
    });

    doc.text(`Total: ৳${order.totalPrice}`, 150, y);

    doc.save(`invoice_${order._id}.pdf`);
  };

  return (
    <div className="p-10 mx-auto justify-center mx-w-4xl">
      <h2 className="text-2xl font-bold text-center mb-6 mt-6">Invoice</h2>

      {/* Visual display only */}
      <div className="bg-white text-black p-6 rounded-lg max-w-3xl mx-auto text-sm shadow border">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Order ID: {order._id}</h3>
          <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
          <p>
            Status: <span className="font-semibold">{order.status}</span>
          </p>
          <p>
            Payment:{" "}
            <span className="font-semibold text-blue-800">
              {order.paymentStatus}
            </span>
          </p>
          <p>Transaction ID: {order.transactionId}</p>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold mb-1">Customer Info:</h4>
          <p>Name: {order.user.name}</p>
          <p>Email: {order.user.email}</p>
          <p>Phone: {order.user.phone}</p>
          <p>Address: {order.user.address}</p>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold mb-2">Products:</h4>
          {order.products.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-300 mb-2 text-black pb-2"
            >
              <p>
                <span className="font-medium">{item.product.name}</span> ×{" "}
                {item.quantity}
              </p>
              <p className="text-gray-600 text-xs">
                Category: {item.product.category} | Weight:{" "}
                {item.product.weight}
              </p>
            </div>
          ))}
        </div>

        <div className="text-right font-bold text-base">
          Total: ৳{order.totalPrice}
        </div>
      </div>

      {/* Download Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleDownload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
        >
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default DwonLoadInvioce;
