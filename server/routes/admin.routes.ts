import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { authenticate } from '../middleware/auth';
import { adminOnly } from '../middleware/adminOnly';

const router = Router();
const controller = new AdminController();

// Make user an admin (protected, only existing admins can do this)
router.post(
  '/users/:userId/make-admin',
  authenticate,
  adminOnly,
  controller.makeUserAdmin.bind(controller)
);

// Remove admin role
router.post(
  '/users/:userId/remove-admin',
  authenticate,
  adminOnly,
  controller.removeAdminRole.bind(controller)
);

export default router;
