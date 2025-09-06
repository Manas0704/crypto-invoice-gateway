import axios from "axios";

const COINGECKO_API = "https://api.coingecko.com/api/v3/simple/price";

export const convertFiatToCrypto = async (
  fiatAmount: number,
  crypto: string,
  fiatCurrency: string = "usd"
): Promise<number> => {
  try {
    const res = await axios.get(COINGECKO_API, {
      params: {
        ids: crypto.toLowerCase(), // e.g. bitcoin, ethereum, tether
        vs_currencies: fiatCurrency.toLowerCase(), // e.g. usd, inr
      },
    });

    const rate = res.data[crypto.toLowerCase()][fiatCurrency.toLowerCase()];
    const cryptoAmount = fiatAmount / rate;

    return cryptoAmount;
  } catch (error) {
    console.error("Conversion error:", error);
    throw new Error("Failed to convert fiat to crypto");
  }
};
