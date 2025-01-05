import { Request, Response } from 'express';
import { auth } from '../lib/firebase-admin';

export class AdminController {
  async makeUserAdmin(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      
      // Set admin custom claim
      await auth.setCustomUserClaims(userId, { admin: true });
      
      return res.json({ message: 'User is now an admin' });
    } catch (error) {
      console.error('Failed to make user admin:', error);
      return res.status(500).json({ error: 'Failed to update user role' });
    }
  }

  async removeAdminRole(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      
      // Remove admin custom claim
      await auth.setCustomUserClaims(userId, { admin: false });
      
      return res.json({ message: 'Admin role removed' });
    } catch (error) {
      console.error('Failed to remove admin role:', error);
      return res.status(500).json({ error: 'Failed to update user role' });
    }
  }
}
