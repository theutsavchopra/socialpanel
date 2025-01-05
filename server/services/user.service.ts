import { User } from '../types/user';
import { db } from '../db';

export class UserService {
  private static instance: UserService;

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async findByEmail(email: string): Promise<User | null> {
    return db.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return db.user.findUnique({ where: { id } });
  }

  async create(data: { email: string; password: string }): Promise<User> {
    return db.user.create({ data });
  }

  async updatePassword(userId: string, hashedPassword: string): Promise<void> {
    await db.user.update({
      where: { id: userId },
      data: { 
        password: hashedPassword,
        tempPassword: null
      }
    });
  }

  async updateTempPassword(email: string, hashedPassword: string): Promise<void> {
    await db.user.update({
      where: { email },
      data: { tempPassword: hashedPassword }
    });
  }
}
