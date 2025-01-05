import { db } from '../db';
import { Redis } from 'ioredis';
import { formatMetrics } from '../utils/metrics';
import type { SystemHealth, DashboardOverview, TransactionMetrics } from '../types/monitoring';

const redis = new Redis(process.env.REDIS_URL);

export class MonitoringService {
  private static instance: MonitoringService;

  static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  async getDashboardOverview({ startDate, endDate }: DateRange): Promise<DashboardOverview> {
    const [
      transactions,
      activeUsers,
      failedAttempts,
      totalVolume
    ] = await Promise.all([
      this.getTransactionCount(startDate, endDate),
      this.getActiveUsers(startDate, endDate),
      this.getFailedAttempts(startDate, endDate),
      this.getTotalVolume(startDate, endDate)
    ]);

    return {
      transactions,
      activeUsers,
      failedAttempts,
      totalVolume,
      updatedAt: new Date()
    };
  }

  async getTransactionMetrics({ 
    startDate, 
    endDate, 
    groupBy 
  }: MetricsQuery): Promise<TransactionMetrics> {
    const transactions = await db.walletTransaction.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return formatMetrics(transactions, groupBy);
  }

  async getAlerts({ 
    startDate, 
    endDate, 
    severity 
  }: AlertQuery) {
    return db.alertLog.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate
        },
        severity: severity
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async getSystemHealth(): Promise<SystemHealth> {
    const [dbLatency, redisLatency] = await Promise.all([
      this.checkDatabaseLatency(),
      this.checkRedisLatency()
    ]);

    return {
      status: 'healthy',
      services: {
        database: {
          status: dbLatency < 100 ? 'healthy' : 'degraded',
          latency: dbLatency
        },
        redis: {
          status: redisLatency < 50 ? 'healthy' : 'degraded',
          latency: redisLatency
        }
      },
      timestamp: new Date()
    };
  }

  private async getTransactionCount(startDate: Date, endDate: Date): Promise<number> {
    return db.walletTransaction.count({
      where: {
        createdAt: { gte: startDate, lte: endDate }
      }
    });
  }

  private async getActiveUsers(startDate: Date, endDate: Date): Promise<number> {
    return db.wallet.count({
      where: {
        transactions: {
          some: {
            createdAt: { gte: startDate, lte: endDate }
          }
        }
      }
    });
  }

  private async getFailedAttempts(startDate: Date, endDate: Date): Promise<number> {
    return db.transactionLog.count({
      where: {
        type: 'failure',
        createdAt: { gte: startDate, lte: endDate }
      }
    });
  }

  private async getTotalVolume(startDate: Date, endDate: Date): Promise<number> {
    const result = await db.walletTransaction.aggregate({
      where: {
        status: 'completed',
        createdAt: { gte: startDate, lte: endDate }
      },
      _sum: {
        amount: true
      }
    });

    return result._sum.amount || 0;
  }

  private async checkDatabaseLatency(): Promise<number> {
    const start = Date.now();
    await db.$queryRaw`SELECT 1`;
    return Date.now() - start;
  }

  private async checkRedisLatency(): Promise<number> {
    const start = Date.now();
    await redis.ping();
    return Date.now() - start;
  }
}
