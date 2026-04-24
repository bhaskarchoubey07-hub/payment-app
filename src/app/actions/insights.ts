'use server';

import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { aiFinancialBrain } from '@/lib/ai/gemini';

/**
 * Fetches comprehensive financial insights using AI
 */
export async function getAetherInsights() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      transactions: {
        orderBy: { createdAt: 'desc' },
        take: 100
      },
      accounts: true
    }
  });

  if (!dbUser) return null;

  // 1. Calculate spending split
  const categories: Record<string, number> = {
    Essential: 0,
    Lifestyle: 0,
    Investments: 0
  };

  dbUser.transactions.forEach(tx => {
    const amount = Math.abs(tx.amount);
    if (tx.category === 'Food' || tx.category === 'Transport' || tx.category === 'Housing' || tx.category === 'Utilities') {
      categories.Essential += amount;
    } else if (tx.category === 'Shopping' || tx.category === 'Entertainment') {
      categories.Lifestyle += amount;
    } else if (tx.category === 'Investment') {
      categories.Investments += amount;
    } else {
      categories.Lifestyle += amount; // Fallback
    }
  });

  // 2. Calculate Health Score (0-100)
  // Simplified logic: Balance / (Total Expenses + 1) * Factor
  const totalBalance = dbUser.accounts.reduce((acc, a) => acc + (a.type === 'BANK' ? a.balance : 0), 0);
  const totalExpenses = dbUser.transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + Math.abs(t.amount), 0);
  
  let healthScore = 70; // Baseline
  if (totalExpenses > 0) {
    const savingsRatio = (totalBalance / totalExpenses);
    healthScore = Math.min(100, Math.max(0, 50 + (savingsRatio * 10)));
  }

  // 3. Get AI Insight
  const aiInsight = await aiFinancialBrain.generateInsight(
    dbUser.transactions.slice(0, 5).map(t => ({ description: t.merchantName || 'Unknown', amount: t.amount })),
    totalBalance
  );

  return {
    healthScore: Math.round(healthScore),
    spendingSplit: categories,
    aiInsight,
    prediction: {
      nextMonth: totalBalance + (totalBalance * 0.05), // Simulated 5% growth
      confidence: 0.88
    },
    goal: {
      name: 'Emergency Fund',
      current: totalBalance,
      target: 500000
    }
  };
}
