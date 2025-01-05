export interface CreatePaymentRequest {
  amount: string;
  currency: string;
  order_id: string;
  url_callback?: string;
  url_return?: string;
  is_payment_multiple?: boolean;
  lifetime?: number;
  to_currency?: string;
}

export interface PaymentResult {
  uuid: string;
  order_id: string;
  amount: string;
  payment_amount: string;
  currency: string;
  payment_currency: string;
  status: string;
  url: string;
}

export interface CryptomusResponse<T> {
  state: 0 | 1;
  result: T;
  message?: string;
}
