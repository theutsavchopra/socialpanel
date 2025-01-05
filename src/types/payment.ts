export interface CreatePaymentResponse {
  paymentId: string;
  paymentUrl: string;
  amount: number;
  currency: string;
}

export type PaymentStatus = 'pending' | 'completed' | 'failed';
