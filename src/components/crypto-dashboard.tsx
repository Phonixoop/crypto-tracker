"use client";

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

export default function CryptoDashboard() {
  return (
    <Card className="mx-auto w-full max-w-4xl bg-[#1a1a3a]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">
          Crypto Buy Targets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="eth-eco" className="w-full">
          <TabsList className="mb-4 grid grid-cols-4 lg:grid-cols-8">
            {categories.map((category) => (
              <TabsTrigger
                key={category.name}
                value={category.name}
                className="text-sm"
              >
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category) => (
            <TabsContent key={category.name} value={category.name}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Coin</TableHead>
                    <TableHead>Target 1</TableHead>
                    <TableHead>Target 2</TableHead>
                    <TableHead>Target 3</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {category.coins.map((item) => (
                    <TableRow key={item.coin}>
                      <TableCell className="font-medium text-white">
                        {item.coin}
                      </TableCell>
                      {item.targets.map((target, index) => (
                        <TableCell key={index} className="font-mono text-white">
                          ${target.toFixed(target < 0.01 ? 8 : 2)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
