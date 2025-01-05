export class WalletError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400
  ) {
    super(message);
    this.name = 'WalletError';
  }
}

export class InsufficientFundsError extends WalletError {
  constructor() {
    super(
      'Insufficient funds in wallet',
      'INSUFFICIENT_FUNDS',
      400
    );
  }
}

export class TransactionError extends WalletError {
  constructor(message: string) {
    super(
      message,
      'TRANSACTION_ERROR',
      400
    );
  }
}

export class PaymentProcessingError extends WalletError {
  constructor(message: string) {
    super(
      message,
      'PAYMENT_PROCESSING_ERROR',
      500
    );
  }
}
