import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/user.service';
import { generateTempPassword } from '../utils/auth';

export class AuthController {
  private userService = UserService.getInstance();

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await this.userService.findByEmail(email);

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: '24h'
      });

      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          createdAt: user.createdAt
        }
      });
    } catch (error) {
      console.error('Login failed:', error);
      return res.status(500).json({ error: 'Login failed' });
    }
  }

  async changePassword(req: Request, res: Response) {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user!.id;

      const user = await this.userService.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const isValid = await bcrypt.compare(currentPassword, user.password);
      if (!isValid) {
        return res.status(401).json({ error: 'Current password is incorrect' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.userService.updatePassword(userId, hashedPassword);

      return res.json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Password change failed:', error);
      return res.status(500).json({ error: 'Failed to change password' });
    }
  }

  async createTempPassword(email: string): Promise<string> {
    const tempPassword = generateTempPassword();
    const hashedPassword = await bcrypt.hash(tempPassword, 10);
    await this.userService.updateTempPassword(email, hashedPassword);
    return tempPassword;
  }
}
