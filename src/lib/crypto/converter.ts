import axios from 'axios';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export const cryptoConverter = {
  /**
   * Fetches the current exchange rate for a crypto to INR
   */
  async getExchangeRate(cryptoId: string = 'ethereum'): Promise<number> {
    try {
      const response = await axios.get(`${COINGECKO_API}/simple/price?ids=${cryptoId}&vs_currencies=inr`);
      return response.data[cryptoId].inr;
    } catch (error) {
      console.error("Exchange Rate Error:", error);
      // Fallback rate (mock data for development)
      return 350000; 
    }
  },

  /**
   * Calculates the conversion from Crypto to INR including optimized fees
   */
  async calculateConversion(amountCrypto: number, cryptoId: string) {
    const rate = await this.getExchangeRate(cryptoId);
    const grossInr = amountCrypto * rate;
    
    // Fee optimization logic (lower fees for FinOS users)
    const feePercentage = 0.005; // 0.5% optimization vs standard 1-2%
    const fee = grossInr * feePercentage;
    const netInr = grossInr - fee;

    return {
      rate,
      grossInr,
      fee,
      netInr,
      currency: "INR"
    };
  }
};
