import React from "react";

const CurrentDelevary = () => {
  return (
    <div
      className="relative bg-cover bg-center py-10 px-4 rounded-lg max-w-4xl mx-auto"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/k69LTZ3h/delivery-staff-ride-motorcycles-shopping-concept-1150-34879.jpg')",
      }}
    >
      <h1 className="text-xl text-center font-bold mt-2 text-black">
        Currently Delivering in
      </h1>
      <div className="relative grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6 max-w-md mx-auto mt-10 sm:max-w-none">
        <button
          style={{ backgroundColor: "#f59e0b" }}
          className="bg-teal-400 text-black rounded-lg py-3 px-6 font-semibold shadow-md hover:bg-teal-500 transition duration-300"
        >
          Dhaka
        </button>
        <button
          style={{ backgroundColor: "#f59e0b" }}
          className="bg-teal-400 text-black rounded-lg py-3 px-6 font-semibold shadow-md hover:bg-teal-500 transition duration-300"
        >
          Chattogram
        </button>
        <button
          style={{ backgroundColor: "#f59e0b" }} // Tailwind amber-500 hex code
          className="text-black rounded-lg py-3 px-6 font-semibold shadow-md hover:bg-teal-500 transition duration-300"
        >
          Jashore
        </button>
      </div>
    </div>
  );
};

export default CurrentDelevary;
