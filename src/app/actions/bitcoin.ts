'use server';

import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

/**
 * Handles buying or selling Bitcoin
 */
export async function tradeBitcoin(
  btcAmount: number, 
  priceINR: number, 
  type: 'BUY' | 'SELL'
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const totalINR = btcAmount * priceINR;

  return await prisma.$transaction(async (tx) => {
    // 1. Get accounts
    const dbUser = await tx.user.findUnique({
      where: { id: user.id },
      include: { accounts: true }
    });

    if (!dbUser) throw new Error('User not found');

    const bankAccount = dbUser.accounts.find(a => a.type === 'BANK');
    const btcAccount = dbUser.accounts.find(a => a.provider === 'Bitcoin');

    if (!bankAccount || !btcAccount) {
      throw new Error('Required accounts (Bank/BTC) not found');
    }

    if (type === 'BUY') {
      if (bankAccount.balance < totalINR) throw new Error('Insufficient INR balance');
      
      // Deduct INR, Add BTC
      await tx.account.update({
        where: { id: bankAccount.id },
        data: { balance: { decrement: totalINR } }
      });
      await tx.account.update({
        where: { id: btcAccount.id },
        data: { balance: { increment: btcAmount } }
      });
    } else {
      if (btcAccount.balance < btcAmount) throw new Error('Insufficient BTC balance');

      // Deduct BTC, Add INR
      await tx.account.update({
        where: { id: btcAccount.id },
        data: { balance: { decrement: btcAmount } }
      });
      await tx.account.update({
        where: { id: bankAccount.id },
        data: { balance: { increment: totalINR } }
      });
    }

    // 2. Log transaction
    await tx.transaction.create({
      data: {
        id: crypto.randomUUID(),
        userId: user.id,
        amount: type === 'BUY' ? -totalINR : totalINR,
        currency: 'INR',
        type: type === 'BUY' ? 'DEBIT' : 'CREDIT',
        method: 'CRYPTO',
        merchantName: `BTC ${type} (${btcAmount.toFixed(8)} BTC)`,
        status: 'SUCCESS'
      }
    });

    revalidatePath('/');
    return { success: true };
  });
}
