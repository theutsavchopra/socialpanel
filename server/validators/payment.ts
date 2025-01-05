import { z } from 'zod';

export const createPaymentSchema = z.object({
  orderId: z.string(),
  amount: z.number().positive(),
  currency: z.string()
});

export function validateCreatePayment(data: unknown) {
  return createPaymentSchema.safeParse(data);
}
