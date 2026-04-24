'use server';

import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

/**
 * Fetches platform-wide stats for the admin dashboard
 */
export async function getAdminStats() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Basic admin check - in production you'd check roles/metadata
  if (!user) throw new Error('Unauthorized');

  const [totalVolume, activeLoans, userCount] = await Promise.all([
    prisma.transaction.aggregate({
      _sum: { amount: true },
    }),
    prisma.loan.aggregate({
      where: { status: 'ACTIVE' },
      _sum: { amount: true },
    }),
    prisma.user.count(),
  ]);

  return {
    totalVolume: Math.abs(totalVolume._sum.amount || 0),
    activeLoans: activeLoans._sum.amount || 0,
    userCount,
    fraudScore: 0.04, // Placeholder for real AI risk engine
  };
}

/**
 * Fetches pending loan applications for approval
 */
export async function getPendingLoans() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  return prisma.loan.findMany({
    where: { status: 'PENDING' },
    include: {
      user: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Updates the status of a loan application
 */
export async function updateLoanStatus(loanId: string, status: 'APPROVED' | 'REJECTED') {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const updatedLoan = await prisma.loan.update({
    where: { id: loanId },
    data: { status: status === 'APPROVED' ? 'ACTIVE' : 'REJECTED' },
  });

  revalidatePath('/admin');
  return updatedLoan;
}
