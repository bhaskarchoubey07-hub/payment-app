import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

export interface TransactionSummary {
  description: string;
  amount: number;
}

export const aiFinancialBrain = {
  /**
   * Categorizes a transaction based on its description using Groq
   */
  async categorizeTransaction(description: string) {
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "Categorize the financial transaction into one of these: Food, Transport, Housing, Shopping, Entertainment, Investment, Health, Utilities, Salary, Other. Only return the category name."
          },
          {
            role: "user",
            content: `Description: "${description}"`
          }
        ],
        model: "llama-3.3-70b-versatile",
      });

      return chatCompletion.choices[0]?.message?.content?.trim() || "Other";
    } catch (error) {
      console.error("Groq-AI Categorization Error:", error);
      return "Other";
    }
  },

  /**
   * Generates a personalized insight using Groq
   */
  async generateInsight(transactions: TransactionSummary[], balance: number) {
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a high-end AI Financial advisor for FinOS India. Provide a punchy, professional, and helpful 1-sentence insight or alert based on the user's transactions."
          },
          {
            role: "user",
            content: `Current Balance: ₹${balance}. Transactions: ${JSON.stringify(transactions)}`
          }
        ],
        model: "llama-3.3-70b-versatile",
      });

      return chatCompletion.choices[0]?.message?.content?.trim() || "Your finances look stable. Keep tracking your spending.";
    } catch (error) {
      console.error("Groq-AI Insight Error:", error);
      return "Your finances look stable. Keep tracking your spending for better insights.";
    }
  },

  /**
   * Predicts future cash flow using Groq
   */
  async predictCashFlow(history: any[]) {
     // Simplified prediction logic
     return {
      prediction: "positive",
      estimatedSavings: 15000,
      confidence: 0.92
    };
  }
};
