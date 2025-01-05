import { MonitoringService } from './monitoring.service';

export class WalletService {
  private static instance: WalletService;
  private monitoringService = MonitoringService.getInstance();

  // ... existing code ...

  async processPayment(userId: string, orderId: string, amount: number) {
    try {
      // Monitor large transactions
      await this.monitoringService.monitorLargeTransaction(userId, amount, orderId);

      const result = await db.$transaction(async (tx) => {
        // ... existing transaction code ...
      });

      return result;
    } catch (error) {
      await this.monitoringService.monitorFailedTransaction(userId, orderId, error as Error);
      throw error;
    }
  }

  async completeDeposit(transactionId: string) {
    try {
      const result = await db.$transaction(async (tx) => {
        // ... existing transaction code ...
      });

      return result;
    } catch (error) {
      await this.monitoringService.monitorFailedTransaction(
        'system', // System-level transaction
        transactionId,
        error as Error
      );
      throw error;
    }
  }
}
