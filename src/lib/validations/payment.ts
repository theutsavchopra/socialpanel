import { z } from 'zod';

export const cryptomusPaymentSchema = z.object({
  orderId: z.string(),
  amount: z.number().positive(),
  currency: z.string(),
  network: z.string().optional(),
});

export type CryptomusPaymentData = z.infer<typeof cryptomusPaymentSchema>;
