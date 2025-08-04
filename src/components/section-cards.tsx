/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

import authAxiosInstance from "@/axiosInstance/authaxios";
// optional helper to format $

export function SectionCards() {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 1. Fetch Users
        const usersRes = await authAxiosInstance.get("/user");
        setTotalUsers(usersRes.data?.data?.length || 0);

        // 2. Fetch Orders
        const ordersRes = await authAxiosInstance.get(
          "/order/get-all-order-details"
        );
        const orders = ordersRes.data?.data || [];

        // 3. Calculate total revenue
        const revenue = orders.reduce(
          (sum: number, order: any) => sum + Number(order.totalPrice || 0),
          0
        );

        setTotalRevenue(revenue);
      } catch (error) {
        console.error("Dashboard data error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalProfit = totalRevenue * 0.05;

  return (
    <div className="w-full px-6 mt-6 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {/* Total Revenue */}
      <Card className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300 p-6 flex flex-col justify-between">
        <div>
          <CardDescription className="text-sm text-gray-400 uppercase tracking-wide font-semibold mb-2">
            Total Revenue
          </CardDescription>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Tk {loading ? "Loading..." : totalRevenue.toLocaleString()}
          </CardTitle>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-green-700 border-green-700 bg-green-100 flex items-center gap-1 font-medium px-3 py-1 rounded-full"
          >
            <IconTrendingUp className="h-5 w-5" />
            +12.5%
          </Badge>
          <span className="text-sm text-gray-500">Trending up this month</span>
        </div>

        <CardFooter className="mt-4 text-gray-500 text-xs italic">
          Based on total order value
        </CardFooter>
      </Card>

      {/* Total Users */}
      <Card className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300 p-6 flex flex-col justify-between">
        <div>
          <CardDescription className="text-sm text-gray-400 uppercase tracking-wide font-semibold mb-2">
            Total Users
          </CardDescription>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {loading ? "Loading..." : totalUsers.toLocaleString()}
          </CardTitle>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-blue-700 border-blue-700 bg-blue-100 flex items-center gap-1 font-medium px-3 py-1 rounded-full"
          >
            <IconTrendingUp className="h-5 w-5" />
            +8%
          </Badge>
          <span className="text-sm text-gray-500">Users joined recently</span>
        </div>

        <CardFooter className="mt-4 text-gray-500 text-xs italic">
          Including all roles
        </CardFooter>
      </Card>

      {/* Total Profit */}
      <Card className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300 p-6 flex flex-col justify-between">
        <div>
          <CardDescription className="text-sm text-gray-400 uppercase tracking-wide font-semibold mb-2">
            Total Profit (5%)
          </CardDescription>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Tk {loading ? "Loading..." : totalProfit.toFixed(2)}
          </CardTitle>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-purple-700 border-purple-700 bg-purple-100 flex items-center gap-1 font-medium px-3 py-1 rounded-full"
          >
            <IconTrendingUp className="h-5 w-5" />
            +5% of revenue
          </Badge>
          <span className="text-sm text-gray-500">Net profit margin</span>
        </div>

        <CardFooter className="mt-4 text-gray-500 text-xs italic">
          Estimated net gain
        </CardFooter>
      </Card>
    </div>
  );
}
