import { db } from '../db';
import { MonitoringService } from './monitoring.service';

interface AuditEvent {
  type: string;
  userId?: string;
  status: 'success' | 'failed' | 'flagged';
  metadata?: Record<string, any>;
}

export class AuditService {
  private static instance: AuditService;
  private monitoringService = MonitoringService.getInstance();

  static getInstance(): AuditService {
    if (!AuditService.instance) {
      AuditService.instance = new AuditService();
    }
    return AuditService.instance;
  }

  async logSecurityEvent(event: AuditEvent) {
    // Log to database
    const auditLog = await db.auditLog.create({
      data: {
        type: event.type,
        userId: event.userId,
        status: event.status,
        metadata: event.metadata,
        createdAt: new Date()
      }
    });

    // Check for alert conditions
    if (event.status === 'failed' || event.status === 'flagged') {
      await this.checkAlertConditions(event);
    }

    return auditLog;
  }

  async getSecurityEvents(filters: {
    userId?: string;
    type?: string;
    status?: string;
    startDate?: Date;
    endDate?: Date;
  }) {
    return db.auditLog.findMany({
      where: {
        userId: filters.userId,
        type: filters.type,
        status: filters.status,
        createdAt: {
          gte: filters.startDate,
          lte: filters.endDate
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  private async checkAlertConditions(event: AuditEvent) {
    if (!event.userId) return;

    // Check for multiple failed events
    const recentFailures = await db.auditLog.count({
      where: {
        userId: event.userId,
        status: 'failed',
        createdAt: {
          gte: new Date(Date.now() - 15 * 60 * 1000) // Last 15 minutes
        }
      }
    });

    if (recentFailures >= 3) {
      await this.monitoringService.sendAlert('security_events', {
        userId: event.userId,
        failureCount: recentFailures,
        eventType: event.type
      });
    }
  }
}
