"use client";
import React, { useEffect, useState } from "react";

const Newsletter = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div>
      <h1 className="text-center text-2xl text-black font-bold mb-3.5">
        Newsletter
      </h1>
      <div
        className="relative max-w-7xl mx-auto bg-cover bg-center bg-no-repeat py-20 px-4 md:px-8 rounded-md"
        style={{
          backgroundImage:
            "url('https://i.ibb.co/BV5nbcJ1/beautiful-fall-nature-scenery-free-image.webp')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0  bg-opacity-60"></div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="mb-6 text-sm md:text-base text-gray-200">
            Get the latest updates, exclusive deals, and more directly to your
            inbox.
          </p>

          <form className="flex flex-col text-white md:flex-row items-center gap-3 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg w-full md:w-[300px] text-white bg-black outline-none focus:ring-2 focus:ring-red-400"
            />
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
