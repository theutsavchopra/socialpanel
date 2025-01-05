import { z } from 'zod';

export const loadFundsSchema = z.object({
  amount: z.number()
    .min(50, 'Minimum amount is $50')
    .max(10000, 'Maximum amount is $10,000'),
  paymentMethod: z.enum(['stripe', 'cryptomus'])
});

export function validateLoadFunds(data: unknown) {
  return loadFundsSchema.safeParse(data);
}
