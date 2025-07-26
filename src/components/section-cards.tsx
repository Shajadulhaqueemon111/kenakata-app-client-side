/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
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
    <div className="w-full px-6 mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {/* Total Revenue */}
      <Card className="w-full min-h-[180px] rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition duration-300">
        <CardHeader className="pb-2">
          <CardDescription className="text-sm text-gray-500">
            Total Revenue
          </CardDescription>
          <CardTitle className="text-3xl font-bold text-gray-800">
            Tk {loading ? "Loading..." : totalRevenue.toLocaleString()}
          </CardTitle>
        </CardHeader>
        <CardAction className="pt-2">
          <Badge
            variant="outline"
            className="text-green-600 border-green-600 bg-green-50"
          >
            <IconTrendingUp className="h-4 w-4 mr-1" />
            +12.5%
          </Badge>
        </CardAction>
        <CardFooter className="flex-col items-start gap-1.5 text-sm pt-4 text-gray-600">
          <div className="flex gap-2 font-medium text-green-700">
            Trending up this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground text-xs">
            Based on total order value
          </div>
        </CardFooter>
      </Card>

      {/* Total Users */}
      <Card className="rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition duration-300">
        <CardHeader className="pb-2">
          <CardDescription className="text-sm text-gray-500">
            Total Users
          </CardDescription>
          <CardTitle className="text-3xl font-bold text-gray-800">
            {loading ? "Loading..." : totalUsers.toLocaleString()}
          </CardTitle>
        </CardHeader>
        <CardAction className="pt-2">
          <Badge
            variant="outline"
            className="text-blue-600 border-blue-600 bg-blue-50"
          >
            <IconTrendingUp className="h-4 w-4 mr-1" />
            +8%
          </Badge>
        </CardAction>
        <CardFooter className="flex-col items-start gap-1.5 text-sm pt-4 text-gray-600">
          <div className="flex gap-2 font-medium text-blue-700">
            Users joined recently <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground text-xs">
            Including all roles
          </div>
        </CardFooter>
      </Card>

      {/* Total Profit */}
      <Card className="rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition duration-300">
        <CardHeader className="pb-2">
          <CardDescription className="text-sm text-gray-500">
            Total Profit (5%)
          </CardDescription>
          <CardTitle className="text-3xl font-bold text-gray-800">
            Tk {loading ? "Loading..." : totalProfit.toFixed(2)}
          </CardTitle>
        </CardHeader>
        <CardAction className="pt-2">
          <Badge
            variant="outline"
            className="text-purple-600 border-purple-600 bg-purple-50"
          >
            <IconTrendingUp className="h-4 w-4 mr-1" />
            +5% of revenue
          </Badge>
        </CardAction>
        <CardFooter className="flex-col items-start gap-1.5 text-sm pt-4 px-4 pb-4 text-gray-600">
          <div className="flex gap-2 font-medium text-purple-700">
            Net profit margin <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground text-xs">
            Estimated net gain
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
