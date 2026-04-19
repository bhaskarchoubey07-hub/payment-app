export interface TransactionProfile {
  monthlyIncome: number;
  monthlyExpenses: number;
  savingRate: number;
  consistencyScore: number; // 0-1
  repaymentHistory: number; // 0-1
}

export const creditScorer = {
  /**
   * Calculates a FinOS AI Credit Score based on transaction behavior
   * Range: 300 - 900
   */
  calculateScore(profile: TransactionProfile): number {
    const baseScore = 300;
    
    // Weightings
    const weights = {
      savingRate: 300,
      consistency: 150,
      repayment: 150,
    };

    const savingBonus = profile.savingRate * weights.savingRate;
    const consistencyBonus = profile.consistencyScore * weights.consistency;
    const repaymentBonus = profile.repaymentHistory * weights.repayment;

    return Math.min(900, Math.round(baseScore + savingBonus + consistencyBonus + repaymentBonus));
  },

  /**
   * Predicts loan eligibility amount
   */
  getEligibility(score: number, income: number): number {
    if (score < 500) return 0;
    if (score < 700) return income * 1.5;
    return income * 3.5;
  },

  /**
   * Suggested interest rate based on score
   */
  getSuggestedRate(score: number): number {
    if (score > 800) return 8.5; // Premium
    if (score > 700) return 10.5;
    if (score > 600) return 14.5;
    return 18.0;
  }
};
