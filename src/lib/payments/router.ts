export enum PaymentMethod {
  UPI = 'UPI',
  CARD = 'CARD',
  CRYPTO = 'CRYPTO',
}

interface PaymentOption {
  method: PaymentMethod;
  cost: number;
  rewardPoints: number;
  processingTime: string;
  isBest?: boolean;
}

export const paymentRouter = {
  /**
   * Decides the best payment method based on amount and merchant category
   */
  calculateBestRoute(amount: number, category: string, isInternational: boolean): PaymentOption[] {
    const options: PaymentOption[] = [];

    // UPI Logic
    options.push({
      method: PaymentMethod.UPI,
      cost: 0,
      rewardPoints: amount * 0.01,
      processingTime: 'Instant',
    });

    // Card Logic (Assumption: 2% rewards)
    options.push({
      method: PaymentMethod.CARD,
      cost: amount * 0.01, // 1% processing fee for credit?
      rewardPoints: amount * 0.02,
      processingTime: 'Instant',
    });

    // Crypto Logic
    if (isInternational) {
      options.push({
        method: PaymentMethod.CRYPTO,
        cost: 2.50, // Fixed gas simulation
        rewardPoints: amount * 0.05,
        processingTime: '~2 mins',
      });
    }

    // Sort by "Value" = (Reward - Cost)
    const sorted = options.map(opt => ({
      ...opt,
      value: opt.rewardPoints - opt.cost
    })).sort((a, b) => b.value - a.value);

    // Mark the best one
    if (sorted.length > 0) {
      sorted[0].isBest = true;
    }

    return sorted;
  }
};
