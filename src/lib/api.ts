const COINGECKO_API = "https://api.coingecko.com/api/v3";
const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;

export interface CoinPrice {
  id: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  last_updated: string;
}

const coinIdMap: Record<string, string> = {
  LDO: "lido-dao",
  EIGEN: "eigenlayer",
  FNA: "fan-token",
  OP: "optimism",
  SOL: "solana",
  BNB: "binancecoin",
  FTM: "fantom",
  ADA: "cardano",
  XRP: "ripple",
  XLM: "stellar",
  HBAR: "hedera-hashgraph",
  TON: "the-open-network",
  SUI: "sui",
  TIA: "celestia",
  SEI: "sei-network",
  AR: "arweave",
  FIL: "filecoin",
  RNDR: "render-token",
  ATH: "athos",
  HNT: "helium",
  ONDO: "ondo-finance",
  PROPS: "props",
  UNI: "uniswap",
  AAVE: "aave",
  LINK: "chainlink",
  PENDLE: "pendle",
  AERO: "aerodrome",
  HYPER: "hypercent",
  FETCH: "fetch-ai",
  TAO: "bittensor",
  WLD: "worldcoin-wld",
  GRASS: "grassland",
  VIRTUAL: "virtual-reality-game-world",
  DOGE: "dogecoin",
  PEPE: "pepe",
  BRETT: "bretton",
  AI16Z: "ai16z",
  FARTCOIN: "fart-coin",
  WIFF: "wifedoge",
  GOAT: "goat-coin",
};

export async function getCoinPrices(symbols: string[]): Promise<Record<string, CoinPrice>> {
  const ids = symbols.map((symbol) => coinIdMap[symbol]).filter(Boolean);

  const options = {
    method: "GET",
    headers: { accept: "application/json", "x-cg-api-key": API_KEY as string },
  };

  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&ids=${ids.join(
        ","
      )}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`,
      options
    );

    if (!response.ok) {
      throw new Error("Failed to fetch prices");
    }

    const data = await response.json();

    const prices: Record<string, CoinPrice> = {};
    data.forEach((coin: any) => {
      const symbol = Object.entries(coinIdMap).find(([_, val]) => val === coin.id)?.[0];
      if (symbol) {
        prices[symbol] = {
          id: coin.id,
          symbol: coin.symbol,
          current_price: coin.current_price,
          price_change_percentage_24h: coin.price_change_percentage_24h,
          last_updated: coin.last_updated,
        };
      }
    });

    return prices;
  } catch (error) {
    console.error("Error fetching prices:", error);
    return {};
  }
}
