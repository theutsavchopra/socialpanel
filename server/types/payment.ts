export interface CreatePaymentDTO {
  orderId: string;
  amount: number;
  currency: string;
  callbackUrl: string;
  returnUrl: string;
}
