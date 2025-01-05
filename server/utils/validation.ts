import { z } from 'zod';

export const transactionSchema = z.object({
  amount: z.number()
    .positive('Amount must be positive')
    .max(10000, 'Maximum transaction amount is $10,000'),
  currency: z.enum(['USD']),
  type: z.enum(['deposit', 'withdrawal', 'payment']),
  metadata: z.record(z.unknown()).optional()
});

export function validateTransaction(data: unknown) {
  return transactionSchema.safeParse(data);
}
