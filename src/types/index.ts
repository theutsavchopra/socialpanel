export interface Package {
  id: string;
  name: string;
  type: 'worldwide' | 'geo';
  category: 'regular' | 'premium';
  viewCount: number;
  price: number;
  discount?: number;
  description: string;
}

export interface Order {
  id: string;
  packageId: string;
  videoUrl: string;
  email: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
}

export interface PaymentDetails {
  orderId: string;
  amount: number;
  currency: string;
  status: string;
  cryptomusPaymentId?: string;
}
