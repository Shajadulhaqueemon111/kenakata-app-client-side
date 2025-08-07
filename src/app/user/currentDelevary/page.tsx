import React from "react";

const CurrentDelevary = () => {
  return (
    <div className=" px-2">
      <h1 className="text-center text-xl font-bold text-gray-800 mb-4">
        Current Delivery Areas
      </h1>

      <div
        className="relative bg-cover bg-center py-16 px-6 rounded-2xl shadow-xl max-w-7xl mx-auto"
        style={{
          backgroundImage:
            "url('https://i.ibb.co/k69LTZ3h/delivery-staff-ride-motorcycles-shopping-concept-1150-34879.jpg')",
        }}
      >
        <div className="bg-white bg-opacity-80 rounded-xl p-8 max-w-3xl mx-auto">
          <h2 className="text-center text-xl font-bold text-gray-900">
            Currently Delivering In
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {["Dhaka", "Chattogram", "Jashore"].map((city) => (
              <button
                key={city}
                className="bg-amber-400 text-black py-3 px-6 rounded-lg font-semibold shadow hover:bg-amber-500 transition duration-300"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentDelevary;
