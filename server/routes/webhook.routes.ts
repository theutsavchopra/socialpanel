import { Router } from 'express';
import { WebhookController } from '../controllers/webhook.controller';
import { validateStripeSignature, validateCryptomusSignature } from '../middleware/webhook';

const router = Router();
const controller = new WebhookController();

router.post('/stripe', validateStripeSignature, controller.handleStripeWebhook.bind(controller));
router.post('/cryptomus', validateCryptomusSignature, controller.handleCryptomusWebhook.bind(controller));

export default router;
