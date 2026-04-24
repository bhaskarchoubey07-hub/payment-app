'use server';

import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { aiFinancialBrain } from '@/lib/ai/gemini';

/**
 * Processes a live payment transaction
 */
export async function processPayment(formData: {
  amount: number;
  currency: string;
  recipientEmail?: string;
  merchantName?: string;
  method: 'UPI' | 'CRYPTO' | 'CARD' | 'WALLET';
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  // Use a transaction to ensure atomicity
  const result = await prisma.$transaction(async (tx) => {
    // 1. Get user and their primary account
    const dbUser = await tx.user.findUnique({
      where: { id: user.id },
      include: { accounts: true }
    });

    if (!dbUser || dbUser.accounts.length === 0) {
      throw new Error('User account not found');
    }

    const primaryAccount = dbUser.accounts[0];

    // 2. Check balance
    if (primaryAccount.balance < formData.amount) {
      throw new Error('Insufficient funds');
    }

    // 3. Deduct from sender
    await tx.account.update({
      where: { id: primaryAccount.id },
      data: { balance: { decrement: formData.amount } }
    });

    // 4. Create transaction record
    const category = await aiFinancialBrain.categorizeTransaction(
        formData.merchantName || 'Direct Transfer'
    );

    const transaction = await tx.transaction.create({
      data: {
        id: crypto.randomUUID(),
        userId: user.id,
        amount: -formData.amount,
        currency: formData.currency,
        type: 'DEBIT',
        method: formData.method,
        category: category,
        merchantName: formData.merchantName || 'Direct Transfer',
        status: 'SUCCESS'
      }
    });

    // 5. Fraud Detection Logic (Real Engine)
    let riskFlag = null;
    if (formData.amount > 100000) {
      riskFlag = 'Unusually high amount';
    } else if (formData.method === 'CRYPTO' && formData.amount > 50000) {
      riskFlag = 'High-value crypto withdrawal';
    }

    if (riskFlag) {
      await tx.fraudLog.create({
        data: {
          id: crypto.randomUUID(),
          userId: user.id,
          transactionId: transaction.id,
          merchantName: transaction.merchantName,
          amount: formData.amount,
          riskFlag: riskFlag
        }
      });
    }

    return transaction;
  });

  revalidatePath('/');
  return { success: true, transactionId: result.id };
}
