"use client";

import { useState } from "react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { ChartContainer, ChartTooltip } from "~/components/ui/chart";
import { usePrices } from "~/hooks/use-prices";
import { ArrowUpIcon, ArrowDownIcon, Loader2Icon } from "lucide-react";
import { InvestmentInput } from "~/components/investment-input";

interface CryptoTarget {
  coin: string;
  targets: number[];
}

interface CryptoCategory {
  name: string;
  title: string;
  coins: CryptoTarget[];
}
const categories: CryptoCategory[] = [
  {
    name: "eth-eco",
    title: "ETH ECO",
    coins: [
      { coin: "LDO", targets: [1, 1.4, 1.7] },
      { coin: "EIGEN", targets: [2.4, 2.8, 3.3] },
      { coin: "FNA", targets: [0.55, 0.66, 0.88] },
      { coin: "OP", targets: [1.3, 1.5, 1.8] },
    ],
  },
  {
    name: "old-l1",
    title: "OLD L1",
    coins: [
      { coin: "SOL", targets: [130, 155, 170] },
      { coin: "BNB", targets: [570, 600, 660] },
      { coin: "FTM", targets: [0.5, 0.6, 0.74] },
      { coin: "ADA", targets: [0.6, 0.7, 0.84] },
      { coin: "XRP", targets: [1.4, 1.7, 2] },
      { coin: "XLM", targets: [0.2, 0.25, 0.36] },
      { coin: "HBAR", targets: [0.14, 0.19, 0.26] },
    ],
  },
  {
    name: "new-l1",
    title: "NEW L1",
    coins: [
      { coin: "TON", targets: [4, 4.9, 5.5] },
      { coin: "SUI", targets: [2.6, 3, 3.8] },
      { coin: "TIA", targets: [3, 3.7, 4.3] },
      { coin: "SEI", targets: [0.28, 0.32, 0.4] },
    ],
  },
  {
    name: "depin",
    title: "DEPIN",
    coins: [
      { coin: "AR", targets: [10, 13, 16] },
      { coin: "FIL", targets: [3.5, 5, 5] },
      { coin: "RNDR", targets: [5.1, 6, 7] },
      { coin: "ATH", targets: [0.05, 0.059, 0.065] },
      { coin: "HNT", targets: [4.1, 4.9, 6] },
    ],
  },
  {
    name: "rwa",
    title: "RWA",
    coins: [
      { coin: "ONDO", targets: [0.9, 1, 1.3] },
      { coin: "PROPS", targets: [0.05, 0.065, 0.08] },
    ],
  },
  {
    name: "defi",
    title: "DEFI",
    coins: [
      { coin: "UNI", targets: [7.5, 9.5, 11.3] },
      { coin: "AAVE", targets: [180, 215, 290] },
      { coin: "LINK", targets: [14, 16, 20] },
      { coin: "PENDLE", targets: [3.5, 4.2, 5] },
      { coin: "AERO", targets: [1, 1.3, 1.5] },
      { coin: "HYPER", targets: [19, 21, 24] },
    ],
  },
  {
    name: "ai",
    title: "AI",
    coins: [
      { coin: "FETCH", targets: [0.9, 1.1, 1.2] },
      { coin: "TAO", targets: [260, 360, 448] },
      { coin: "WLD", targets: [1.3, 1.6, 2] },
      { coin: "GRASS", targets: [1, 1.4, 1.8] },
      { coin: "VIRTUAL", targets: [1.5, 1.8, 2.6] },
    ],
  },
  {
    name: "meme",
    title: "MEME",
    coins: [
      { coin: "DOGE", targets: [0.16, 0.206, 0.3] },
      { coin: "PEPE", targets: [0.000009, 0.0000125, 0.00017] },
      { coin: "BRETT", targets: [0.077, 0.09, 0.13] },
      { coin: "AI16Z", targets: [0.31, 0.055, 0.87] },
      { coin: "FARTCOIN", targets: [0.04, 0.054, 0.08] },
      { coin: "WIFF", targets: [1, 1.4, 1.8] },
      { coin: "GOAT", targets: [0.15, 0.29, 0.39] },
    ],
  },
];

export default function CryptoDashboardWrapper() {
  return <CryptoDashboard />;
}

function CryptoDashboard() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [investment, setInvestment] = useState(0);
  const symbols = activeCategory?.coins.map((coin) => coin.coin);
  const { data: prices, isLoading, isError } = usePrices(symbols || []);

  const getPriceStatus = (current: number | undefined, targets: number[]) => {
    if (current === undefined) return "unknown";
    if (current >= targets[2]) return "above-target";
    if (current >= targets[1]) return "near-target";
    if (current >= targets[0]) return "approaching";
    return "below";
  };

  const calculateInvestment = (coin: CryptoTarget) => {
    const perCoinInvestment = investment / activeCategory.coins.length;
    const perTargetInvestment = perCoinInvestment / 3;
    return coin.targets.map((target) => perTargetInvestment.toFixed(2));
  };

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="dark">
      <Card className="mx-auto w-full max-w-4xl border-gray-800 bg-gray-900">
        <CardHeader className="border-b border-gray-800">
          <CardTitle className="text-2xl font-bold text-white">
            Crypto Buy Targets
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <InvestmentInput onInvestmentChange={setInvestment} />
          <Tabs
            defaultValue="eth-eco"
            className="mt-6 w-full"
            onValueChange={(value) => {
              const category = categories.find((c) => c.name === value);
              if (category) setActiveCategory(category);
            }}
          >
            <TabsList className="mb-4 grid grid-cols-2 lg:grid-cols-8">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.name}
                  value={category.name}
                  className="text-sm text-white"
                >
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((category) => (
              <TabsContent key={category.name} value={category.name}>
                <div className="space-y-8">
                  <Table>
                    <TableHeader>
                      <TableRow className="text-white">
                        <TableHead className="w-[100px]">Coin</TableHead>
                        <TableHead>Current Price</TableHead>
                        <TableHead>24h Change</TableHead>
                        <TableHead>Target 1</TableHead>
                        <TableHead>Target 2</TableHead>
                        <TableHead>Target 3</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="text-white">
                      {category.coins.map((item) => {
                        const price = prices?.[item.coin];
                        const status = getPriceStatus(
                          price?.current_price,
                          item.targets,
                        );
                        const investments = calculateInvestment(item);

                        return (
                          <TableRow
                            key={item.coin}
                            className={
                              status === "above-target"
                                ? "bg-green-500/10"
                                : status === "near-target"
                                  ? "bg-yellow-500/10"
                                  : status === "approaching"
                                    ? "bg-blue-500/10"
                                    : ""
                            }
                          >
                            <TableCell className="font-medium">
                              {item.coin}
                            </TableCell>
                            <TableCell className="font-mono">
                              {isLoading ? (
                                <Loader2Icon className="h-4 w-4 animate-spin" />
                              ) : price?.current_price !== undefined ? (
                                `$${price.current_price.toFixed(
                                  price.current_price < 0.01 ? 8 : 2,
                                )}`
                              ) : (
                                "N/A"
                              )}
                            </TableCell>
                            <TableCell>
                              {price?.price_change_percentage_24h !==
                                undefined && (
                                <span
                                  className={`flex items-center ${
                                    price.price_change_percentage_24h > 0
                                      ? "text-green-500"
                                      : "text-red-500"
                                  }`}
                                >
                                  {price.price_change_percentage_24h > 0 ? (
                                    <ArrowUpIcon className="mr-1 h-4 w-4" />
                                  ) : (
                                    <ArrowDownIcon className="mr-1 h-4 w-4" />
                                  )}
                                  {Math.abs(
                                    price.price_change_percentage_24h,
                                  ).toFixed(2)}
                                  %
                                </span>
                              )}
                            </TableCell>
                            {item.targets.map((target, index) => (
                              <TableCell
                                key={index}
                                className={`font-mono ${
                                  price?.current_price !== undefined &&
                                  price.current_price >= target
                                    ? "text-green-500"
                                    : ""
                                }`}
                              >
                                ${target.toFixed(target < 0.01 ? 8 : 2)}
                                {investment > 0 && (
                                  <div className="text-xs text-gray-400">
                                    Buy: ${investments[index]}
                                  </div>
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>

                  <Card className="bg-gray-800 p-4">
                    <CardTitle className="mb-4 text-white">
                      Price vs Targets Chart
                    </CardTitle>
                    <div className="h-[400px]">
                      <ChartContainer config={{}}>
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={category.coins.map((coin) => ({
                              name: coin.coin,
                              current: prices?.[coin.coin]?.current_price ?? 0,
                              target1: coin.targets[0],
                              target2: coin.targets[1],
                              target3: coin.targets[2],
                            }))}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey="current"
                              stroke="#8884d8"
                              name="Current Price"
                            />
                            <Line
                              type="monotone"
                              dataKey="target1"
                              stroke="#82ca9d"
                              name="Target 1"
                              strokeDasharray="5 5"
                            />
                            <Line
                              type="monotone"
                              dataKey="target2"
                              stroke="#ffc658"
                              name="Target 2"
                              strokeDasharray="5 5"
                            />
                            <Line
                              type="monotone"
                              dataKey="target3"
                              stroke="#ff7300"
                              name="Target 3"
                              strokeDasharray="5 5"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
