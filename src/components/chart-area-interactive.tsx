"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import moment from "moment";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import authAxiosInstance from "@/axiosInstance/authaxios";

type TOrder = {
  createdAt: string;
  totalPrice: number;
};

const chartConfig = {
  sales: {
    label: "Total Sales",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState<"90d" | "30d" | "7d">("90d");
  const [chartData, setChartData] = React.useState<
    { date: string; sales: number }[]
  >([]);

  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await authAxiosInstance.get(
          "/order/get-all-order-details"
        );
        const orders: TOrder[] = data?.data || [];

        const daysMap: Record<"90d" | "30d" | "7d", number> = {
          "90d": 90,
          "30d": 30,
          "7d": 7,
        };

        const startDate = moment().subtract(daysMap[timeRange], "days");

        const dailyTotals: Record<string, number> = {};

        orders.forEach((order) => {
          const date = moment(order.createdAt).format("YYYY-MM-DD");
          if (moment(date).isSameOrAfter(startDate)) {
            dailyTotals[date] =
              (dailyTotals[date] || 0) + Number(order.totalPrice);
          }
        });

        const chartFormatted = Object.entries(dailyTotals)
          .map(([date, total]) => ({
            date,
            sales: total,
          }))
          .sort((a, b) => moment(a.date).diff(moment(b.date)));

        setChartData(chartFormatted);
      } catch (error) {
        console.error("Failed to fetch order data", error);
        setChartData([]);
      }
    };

    fetchOrders();
  }, [timeRange]);

  const totalSales = chartData.reduce((sum, item) => sum + item.sales, 0);
  const avgSales = chartData.length ? totalSales / chartData.length : 0;
  const maxSales = chartData.length
    ? Math.max(...chartData.map((item) => item.sales))
    : 0;

  return (
    <Card className="pt-0">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-2 border-b py-5">
        <div className="flex-1 space-y-1">
          <CardTitle className="text-2xl font-semibold">Sales Report</CardTitle>
          <CardDescription className="text-gray-500">
            Sales data over time
          </CardDescription>
        </div>
        <Select
          value={timeRange}
          onValueChange={(val) => setTimeRange(val as "90d" | "30d" | "7d")}
        >
          <SelectTrigger
            className="w-[160px] rounded-lg"
            aria-label="Select time range"
          >
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d">Last 3 months</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-4 pt-6 sm:px-8 sm:pt-8">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-sales)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-sales)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              minTickGap={25}
              tickFormatter={(value) => moment(value).format("MMM D")}
              stroke="#6b7280"
            />
            <ChartTooltip
              cursor={{ stroke: "#3b82f6", strokeWidth: 2 }}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    moment(value).format("MMM D, YYYY")
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="sales"
              type="natural"
              fill="url(#fillSales)"
              stroke="var(--color-sales)"
              strokeWidth={3}
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>

        {/* Summary Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="bg-blue-50 border-blue-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-blue-700">
                Total Sales
              </CardTitle>
              <CardDescription className="text-blue-600 text-xl font-bold mt-1">
                ${totalSales.toFixed(2)}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-green-50 border-green-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-green-700">
                Average Daily Sales
              </CardTitle>
              <CardDescription className="text-green-600 text-xl font-bold mt-1">
                ${avgSales.toFixed(2)}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-yellow-50 border-yellow-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-yellow-700">
                Max Sales in a Day
              </CardTitle>
              <CardDescription className="text-yellow-600 text-xl font-bold mt-1">
                ${maxSales.toFixed(2)}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-purple-50 border-purple-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-purple-700">
                Data Points
              </CardTitle>
              <CardDescription className="text-purple-600 text-xl font-bold mt-1">
                {chartData.length}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
