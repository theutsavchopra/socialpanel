import axios from 'axios';
import { useSettingsStore } from '@/stores/settingsStore';
import type { CreatePaymentResponse } from '@/types/payment';

interface CreatePaymentParams {
  orderId: string;
  amount: number;
  currency: string;
}

export async function createPayment(params: CreatePaymentParams): Promise<CreatePaymentResponse> {
  const { merchantId, paymentApiKey } = useSettingsStore.getState().settings;

  try {
    const response = await axios.post('/api/payment/create', {
      ...params,
      merchantId,
      apiKey: paymentApiKey
    });

    return {
      paymentId: response.data.paymentId,
      paymentUrl: response.data.paymentUrl,
      amount: params.amount,
      currency: params.currency
    };
  } catch (error) {
    console.error('Payment creation failed:', error);
    throw new Error('Payment creation failed. Please try again.');
  }
}
