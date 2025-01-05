import axios from 'axios';
import type { CreatePaymentResponse } from '@/types/payment';

const MERCHANT_ID = 'f27c97b4-ee41-4197-878b-c47accabf386';
const CRYPTOMUS_API = 'https://api.cryptomus.com/v1/payment';

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
    const payload = {
      merchant_id: MERCHANT_ID,
      order_id: orderId,
      amount: amount.toFixed(2),
      currency,
      url_callback: `${window.location.origin}/payment/callback`,
      url_return: `${window.location.origin}/payment/success`,
      is_payment_multiple: false,
      lifetime: 7200,
      to_currency: 'USD'
    };

    const response = await axios.post(CRYPTOMUS_API, payload);

    if (!response.data?.result?.url) {
      throw new Error('Invalid payment response');
    }

    return {
      paymentId: response.data.result.uuid,
      paymentUrl: response.data.result.url,
      amount,
      currency
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Payment creation failed: ${error.message}`);
    }
    throw new Error('Payment creation failed');
  }
}
