import axios from 'axios';
import { CRYPTOMUS_CONFIG } from '../config/cryptomus';
import { generateSignature } from '../utils/cryptomus';
import type { CreatePaymentDTO } from '../types/payment';

export class PaymentService {
  private static instance: PaymentService;
  private readonly client;

  private constructor() {
    this.client = axios.create({
      baseURL: CRYPTOMUS_CONFIG.API.BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    // Add signature to all requests
    this.client.interceptors.request.use((config) => {
      const payload = config.data || {};
      config.headers['merchant'] = CRYPTOMUS_CONFIG.MERCHANT_ID;
      config.headers['sign'] = generateSignature(payload);
      return config;
    });
  }

  static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  async createPayment(data: CreatePaymentDTO) {
    const payload = {
      merchant_id: CRYPTOMUS_CONFIG.MERCHANT_ID,
      order_id: data.orderId,
      amount: data.amount.toFixed(2),
      currency: data.currency,
      url_callback: data.callbackUrl,
      url_return: data.returnUrl,
      is_payment_multiple: false,
      lifetime: 7200,
      to_currency: 'USD'
    };

    const response = await this.client.post(
      CRYPTOMUS_CONFIG.API.ENDPOINTS.PAYMENT,
      payload
    );

    return response.data.result;
  }

  async getPaymentStatus(paymentId: string) {
    const payload = {
      merchant_id: CRYPTOMUS_CONFIG.MERCHANT_ID,
      uuid: paymentId
    };

    const response = await this.client.post(
      CRYPTOMUS_CONFIG.API.ENDPOINTS.PAYMENT_STATUS,
      payload
    );

    return response.data.result;
  }
}
