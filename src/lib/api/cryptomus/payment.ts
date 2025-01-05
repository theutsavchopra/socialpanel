import axios from 'axios';
import { CRYPTOMUS_CONFIG } from '@/config/cryptomus';
import type { CreatePaymentResponse } from '@/types/payment';

interface CreatePaymentParams {
  orderId: string;
  amount: number;
  currency: string;
}

export async function createPayment({
  orderId,
  amount,
  currency
}: CreatePaymentParams): Promise<CreatePaymentResponse> {
  try {
    // Instead of making direct API calls to Cryptomus, we'll call our backend
    const response = await axios.post('/api/payment/create', {
      orderId,
      amount: amount.toFixed(2),
      currency,
      returnUrl: `${window.location.origin}/payment/success`
    });

    if (!response.data?.paymentUrl) {
      throw new Error('Invalid payment response');
    }

    return {
      paymentId: response.data.paymentId,
      paymentUrl: response.data.paymentUrl,
      amount,
      currency
    };
  } catch (error) {
    console.error('Payment creation failed:', error);
    throw new Error('Failed to create payment. Please try again.');
  }
}
