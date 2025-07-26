"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useEffect, useState } from "react";
import publicAxios from "@/axiosInstance/publicaxios";
import toast from "react-hot-toast";
import { clearCart } from "@/app/redux/features/counter/counterSlice";

export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const TAX_RATE = 0.05;
  const COMMISSION_RATE = 0.1;

  const baseTotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
  const tax = baseTotal * TAX_RATE;
  const commission = baseTotal * COMMISSION_RATE;
  const finalTotal = baseTotal + tax + commission;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    const payload = {
      ...userData,
      cartItems,
      totalAmount: finalTotal,
    };

    console.log("Sending Payload:", payload);

    try {
      const response = await publicAxios.post("/order/create", payload);
      const data = response.data;

      if (data?.success && data?.data?.payment_url) {
        toast.success("Redirecting to payment...");

        dispatch(clearCart());
        window.location.href = data.data.payment_url;
      } else {
        toast.error("Payment URL not found!");
      }
    } catch (err) {
      console.error("Checkout Error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 text-black py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Billing Form */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-black">Billing Details</h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={userData.name}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={userData.phone}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={userData.address}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          onClick={handleCheckout}
          className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded shadow"
        >
          Place Order
        </button>
      </div>

      {/* Cart Summary */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-black">Cart Summary</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-2 text-gray-700 text-sm">
              {cartItems.map((item) => (
                <li key={item._id} className="flex justify-between">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>
                    ৳{(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </div>

            <hr className="my-4" />
            <ul className="text-sm space-y-2">
              <li className="flex justify-between">
                <span>Subtotal:</span>
                <span>৳{baseTotal.toFixed(2)}</span>
              </li>
              <li className="flex justify-between">
                <span>Tax (5%):</span>
                <span>৳{tax.toFixed(2)}</span>
              </li>
              <li className="flex justify-between">
                <span>Commission (10%):</span>
                <span>৳{commission.toFixed(2)}</span>
              </li>
              <li className="flex justify-between font-bold text-black border-t pt-2">
                <span>Total:</span>
                <span>৳{finalTotal.toFixed(2)}</span>
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
