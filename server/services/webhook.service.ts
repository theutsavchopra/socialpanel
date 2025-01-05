import { db } from '../db';

export class WebhookService {
  private static instance: WebhookService;

  static getInstance(): WebhookService {
    if (!WebhookService.instance) {
      WebhookService.instance = new WebhookService();
    }
    return WebhookService.instance;
  }

  async logWebhook(provider: string, payload: any) {
    return db.webhookLog.create({
      data: {
        provider,
        payload,
        processedAt: new Date()
      }
    });
  }

  async getWebhookLogs(provider?: string) {
    return db.webhookLog.findMany({
      where: provider ? { provider } : undefined,
      orderBy: { processedAt: 'desc' }
    });
  }
}
