import { Request, Response } from 'express';
import { MonitoringService } from '../services/monitoring.service';
import { AuditService } from '../services/audit.service';
import { parseTimeRange } from '../utils/date';

export class MonitoringController {
  private monitoringService = MonitoringService.getInstance();
  private auditService = AuditService.getInstance();

  async getOverview(req: Request, res: Response) {
    try {
      const { timeRange } = req.query;
      const { startDate, endDate } = parseTimeRange(timeRange as string);

      const overview = await this.monitoringService.getDashboardOverview({
        startDate,
        endDate
      });

      return res.json(overview);
    } catch (error) {
      console.error('Failed to get overview:', error);
      return res.status(500).json({ error: 'Failed to get overview data' });
    }
  }

  async getTransactionMetrics(req: Request, res: Response) {
    try {
      const { timeRange, groupBy = 'hour' } = req.query;
      const { startDate, endDate } = parseTimeRange(timeRange as string);

      const metrics = await this.monitoringService.getTransactionMetrics({
        startDate,
        endDate,
        groupBy: groupBy as 'hour' | 'day' | 'week'
      });

      return res.json(metrics);
    } catch (error) {
      console.error('Failed to get transaction metrics:', error);
      return res.status(500).json({ error: 'Failed to get transaction metrics' });
    }
  }

  async getSecurityEvents(req: Request, res: Response) {
    try {
      const { timeRange, type, status } = req.query;
      const { startDate, endDate } = parseTimeRange(timeRange as string);

      const events = await this.auditService.getSecurityEvents({
        startDate,
        endDate,
        type: type as string,
        status: status as string
      });

      return res.json(events);
    } catch (error) {
      console.error('Failed to get security events:', error);
      return res.status(500).json({ error: 'Failed to get security events' });
    }
  }

  async getAlerts(req: Request, res: Response) {
    try {
      const { timeRange, severity } = req.query;
      const { startDate, endDate } = parseTimeRange(timeRange as string);

      const alerts = await this.monitoringService.getAlerts({
        startDate,
        endDate,
        severity: severity as string
      });

      return res.json(alerts);
    } catch (error) {
      console.error('Failed to get alerts:', error);
      return res.status(500).json({ error: 'Failed to get alerts' });
    }
  }

  async getSystemHealth(req: Request, res: Response) {
    try {
      const health = await this.monitoringService.getSystemHealth();
      return res.json(health);
    } catch (error) {
      console.error('Failed to get system health:', error);
      return res.status(500).json({ error: 'Failed to get system health' });
    }
  }
}
