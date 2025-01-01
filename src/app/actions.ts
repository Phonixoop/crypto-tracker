"use server";

import { getCoinPrices } from "~/lib/api";

export async function fetchPrices(symbols: string[]) {
  return getCoinPrices(symbols);
}
