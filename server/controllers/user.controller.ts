import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { OrderService } from '../services/order.service';
import { generateTempPassword } from '../utils/auth';
import bcrypt from 'bcryptjs';

export class UserController {
  private userService = UserService.getInstance();
  private orderService = OrderService.getInstance();

  async getUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.findAll();
      const usersWithStats = await Promise.all(
        users.map(async (user) => {
          const orders = await this.orderService.findByUserId(user.id);
          const totalSpent = orders.reduce((sum, order) => sum + order.amount, 0);
          
          return {
            ...user,
            totalOrders: orders.length,
            totalSpent,
            password: undefined // Remove sensitive data
          };
        })
      );
      
      return res.json(usersWithStats);
    } catch (error) {
      console.error('Failed to get users:', error);
      return res.status(500).json({ error: 'Failed to get users' });
    }
  }

  async getUserOrders(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const orders = await this.orderService.findByUserId(userId);
      return res.json(orders);
    } catch (error) {
      console.error('Failed to get user orders:', error);
      return res.status(500).json({ error: 'Failed to get orders' });
    }
  }

  async getUserTransactions(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const transactions = await this.orderService.getTransactions(userId);
      return res.json(transactions);
    } catch (error) {
      console.error('Failed to get transactions:', error);
      return res.status(500).json({ error: 'Failed to get transactions' });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const tempPassword = generateTempPassword();
      const hashedPassword = await bcrypt.hash(tempPassword, 10);
      
      await this.userService.updatePassword(userId, hashedPassword);
      
      return res.json({ 
        message: 'Password reset successful',
        tempPassword 
      });
    } catch (error) {
      console.error('Failed to reset password:', error);
      return res.status(500).json({ error: 'Failed to reset password' });
    }
  }
}
