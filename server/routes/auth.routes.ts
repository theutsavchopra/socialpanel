import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const controller = new AuthController();

router.post('/login', controller.login.bind(controller));
router.post('/change-password', authenticate, controller.changePassword.bind(controller));
router.get('/profile', authenticate, controller.getProfile.bind(controller));
router.post('/logout', authenticate, controller.logout.bind(controller));

export default router;
