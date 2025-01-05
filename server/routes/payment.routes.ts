import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';

const router = Router();
const controller = new PaymentController();

router.post('/create', controller.createPayment.bind(controller));
router.post('/webhook', controller.handleWebhook.bind(controller));

export default router;
