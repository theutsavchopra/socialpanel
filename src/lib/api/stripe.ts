import axios from 'axios';

interface CreateSessionParams {
  orderId: string;
  amount: number;
  currency: string;
}

export async function createStripeSession(params: CreateSessionParams) {
  const response = await axios.post('/api/payment/stripe/create-session', params);
  return {
    sessionId: response.data.sessionId,
    sessionUrl: response.data.sessionUrl
  };
}

export async function getPaymentStatus(sessionId: string) {
  const response = await axios.get(`/api/payment/stripe/status/${sessionId}`);
  return response.data.status;
}
