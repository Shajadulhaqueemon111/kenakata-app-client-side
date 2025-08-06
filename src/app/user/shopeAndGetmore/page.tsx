import Image from "next/image";
import React from "react";
import dailyofday from "../../user/allImages/getanddeal/dailyDealsShopInfo.webp";
import shopeearn from "../../user/allImages/getanddeal/image.webp";
import dailyShope from "../../user/allImages/getanddeal/premiumImage.webp";
import { Home, ShoppingBag } from "lucide-react";
import { GiMoneyStack } from "react-icons/gi";

const ShopeAndGetMore = () => {
  return (
    <div className="px-4 py-8 bg-white">
      <h1 className="text-2xl font-bold text-center text-black mb-8">
        Shop & Get More
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card 1 */}
        <div className="bg-[#F9F9F9] p-6 rounded-2xl shadow hover:shadow-lg transition duration-300 text-center">
          <Image
            src={shopeearn}
            alt="shope and earn point"
            height={150}
            width={150}
            className="mx-auto mb-4"
          />
          <h2 className="text-lg font-semibold text-black mb-2">
            Shop & Earn Points
          </h2>
          <p className="text-gray-600 text-sm">
            The more you shop the more you earn - cash back, free shipping,
            exclusive offers and more. Discover the perks of Egg Club
            membership.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#F9F9F9] p-6 rounded-2xl shadow hover:shadow-lg transition duration-300 text-center">
          <Image
            src={dailyofday}
            alt="Deal of the Day"
            height={150}
            width={150}
            className="mx-auto mb-4"
          />
          <h2 className="text-lg font-semibold text-black mb-2">
            Deal of the Day
          </h2>
          <p className="text-gray-600 text-sm">
            Stock up on your favorite groceries for less with our unbeatable
            deals! Don’t miss out - limited stock.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#F9F9F9] p-6 rounded-2xl shadow hover:shadow-lg transition duration-300 text-center">
          <Image
            src={dailyShope}
            alt="Premium Care"
            height={150}
            width={150}
            className="mx-auto mb-4 rounded-md"
          />
          <h2 className="text-lg font-semibold text-black mb-2">
            Premium Care
          </h2>
          <p className="text-gray-600 text-sm">
            Too busy to place an order or handling order issues? No need to
            worry as we give you the option to take premium assistance.
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div>
          <h2 className="text-center text-xl font-bold text-black mt-2 mb-4">
            My Shop View
          </h2>
        </div>
        <div
          className="bg-cover rounded-md bg-center bg-no-repeat px-4 sm:px-6 lg:px-8 py-12 text-center sm:text-left"
          style={{
            backgroundImage:
              "url('https://i.ibb.co/CK4SSNFv/Cushing-Terrell-Metropolitan-Market-Sammamish-Village-03-jpg.webp')",
          }}
        >
          <div className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-lg max-w-xl mx-auto sm:mx-0 shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-3">
              Shop Your Daily Necessities
            </h1>
            <p className="text-gray-800 text-base sm:text-lg leading-relaxed mb-4">
              Shop from our popular categories, explore special offers, and
              receive groceries at your doorstep within 1 hour.
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300 ease-in-out">
              Get Started
            </button>
          </div>
        </div>
      </div>
      {/* wirehose sction*/}
      <div className="mt-6">
        <div>
          <h1 className="text-xl font-bold text-center text-black mb-2">
            Trusted by Families, Backed by Millions
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 px-4 py-8">
          {/* Card 1 */}

          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-semibold text-gray-800">
                  26 warehouses
                </h1>
                <p className="text-gray-600">all over Bangladesh</p>
              </div>
              <div className="text-green-600 text-4xl">
                <Home />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-semibold text-gray-800">
                  5 million orders
                </h1>
                <p className="text-gray-600">have been delivered</p>
              </div>
              <div className="text-blue-600 text-4xl">
                <ShoppingBag />
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-semibold text-gray-800">
                  100,000 families
                </h1>
                <p className="text-gray-600">are being served</p>
              </div>
              <div className="text-purple-600 text-4xl">
                <ShoppingBag />
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-semibold text-gray-800">
                  340 million Taka
                </h1>
                <p className="text-gray-600">customer savings</p>
              </div>
              <div className="text-yellow-600 text-4xl">
                <GiMoneyStack />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopeAndGetMore;
