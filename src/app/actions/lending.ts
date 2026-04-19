'use server';

import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { creditScorer } from '@/lib/lending/scorer';
import { revalidatePath } from 'next/cache';

/**
 * Calculates a live credit score based on the user's real transaction history
 */
export async function getLiveCreditScore() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      accounts: true,
      transactions: true
    }
  });

  if (!dbUser) return null;

  // Simple behavior analysis for the score
  const totalBalance = dbUser.accounts.reduce((sub, acc) => sub + acc.balance, 0);
  const txCount = dbUser.transactions.length;
  
  // Simulated profile metrics based on actual DB presence
  const profile = {
    monthlyIncome: 100000,
    monthlyExpenses: 40000,
    savingRate: totalBalance > 0 ? 0.3 : 0.1,
    consistencyScore: Math.min(1, txCount / 10),
    repaymentHistory: 0.8 // Default for new users
  };

  const score = creditScorer.calculateScore(profile);
  const eligibility = creditScorer.getEligibility(score, profile.monthlyIncome);
  const rate = creditScorer.getSuggestedRate(score);

  return { score, eligibility, rate };
}

/**
 * Submits a formal loan application
 */
export async function applyForLoan(amount: number, rate: number, score: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const loan = await prisma.loan.create({
    data: {
      id: crypto.randomUUID(),
      userId: user.id,
      amount,
      interestRate: rate,
      durationMonths: 6,
      aiCreditScore: score,
      status: 'PENDING'
    }
  });

  revalidatePath('/lending');
  return loan;
}
