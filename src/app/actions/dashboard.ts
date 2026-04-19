'use server';

import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

/**
 * Fetches real-time dashboard data for the authenticated user
 */
export async function getDashboardData() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Ensure user exists in Postgres
  let dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      accounts: true,
      transactions: {
        orderBy: { createdAt: 'desc' },
        take: 5
      }
    }
  });

  // Create profile if missing (first social login fallback)
  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email!,
        name: user.user_metadata?.full_name || 'FinOS User',
        accounts: {
          create: {
            id: crypto.randomUUID(),
            type: 'BANK',
            provider: 'HDFC Bank',
            balance: 50000, // Initial sandbox balance
            currency: 'INR'
          }
        }
      },
      include: {
        accounts: true,
        transactions: true
      }
    });
  }

  return dbUser;
}

/**
 * Signs the user out
 */
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/');
}
