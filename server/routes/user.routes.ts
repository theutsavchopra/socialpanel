import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const controller = new UserController();

router.get('/', authenticate, controller.getUsers.bind(controller));
router.get('/orders', authenticate, controller.getUserOrders.bind(controller));
router.get('/transactions', authenticate, controller.getUserTransactions.bind(controller));
router.post('/reset-password/:userId', authenticate, controller.resetPassword.bind(controller));

export default router;
