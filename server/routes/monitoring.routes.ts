import { Router } from 'express';
import { MonitoringController } from '../controllers/monitoring.controller';
import { authenticate } from '../middleware/auth';
import { adminOnly } from '../middleware/adminOnly';

const router = Router();
const controller = new MonitoringController();

// Apply authentication and admin middleware to all routes
router.use(authenticate, adminOnly);

// Dashboard overview
router.get('/overview', controller.getOverview.bind(controller));

// Transaction metrics
router.get('/transactions/metrics', controller.getTransactionMetrics.bind(controller));

// Security events
router.get('/security/events', controller.getSecurityEvents.bind(controller));

// Fraud alerts
router.get('/alerts', controller.getAlerts.bind(controller));

// System health
router.get('/health', controller.getSystemHealth.bind(controller));

export default router;
