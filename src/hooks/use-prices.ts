import { useQuery } from "@tanstack/react-query";
import { getCoinPrices, CoinPrice } from "~/lib/api";

export function usePrices(symbols: string[]) {
  return useQuery<Record<string, CoinPrice>, Error>({
    queryKey: ["coinPrices", symbols],
    queryFn: () => getCoinPrices(symbols),
    refetchInterval: 30000, // Refetch every 30 seconds
    refetchIntervalInBackground: true,
  });
}
