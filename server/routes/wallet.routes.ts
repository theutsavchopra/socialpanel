import { Router } from 'express';
import { WalletController } from '../controllers/wallet.controller';
import { authenticate } from '../middleware/auth';
import { validateTransactionLimits } from '../middleware/transactionSecurity';
import { detectFraud } from '../middleware/fraudDetection';
import { walletRateLimiter } from '../middleware/rateLimit';

const router = Router();
const controller = new WalletController();

// Apply rate limiting to all wallet routes
router.use(walletRateLimiter);

// Get wallet balance
router.get('/balance', authenticate, controller.getBalance.bind(controller));

// Get transaction history
router.get('/transactions', authenticate, controller.getTransactions.bind(controller));

// Load funds - apply security middleware
router.post('/load', 
  authenticate,
  validateTransactionLimits,
  detectFraud,
  controller.loadFunds.bind(controller)
);

// Process payment - apply security middleware
router.post('/pay',
  authenticate,
  validateTransactionLimits,
  detectFraud,
  controller.processPayment.bind(controller)
);

export default router;
