import { Request, Response, NextFunction } from 'express';
import { Redis } from 'ioredis';
import { TransactionError } from '../utils/errors';

const redis = new Redis(process.env.REDIS_URL);

interface SecurityLimits {
  maxDailyTransactions: number;
  maxTransactionAmount: number;
  minTransactionAmount: number;
  maxDailyVolume: number;
}

const SECURITY_LIMITS: SecurityLimits = {
  maxDailyTransactions: 50,
  maxTransactionAmount: 10000, // $10,000
  minTransactionAmount: 1, // $1
  maxDailyVolume: 50000 // $50,000
};

export async function validateTransactionLimits(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.user!.id;
  const amount = parseFloat(req.body.amount);

  try {
    // Check transaction amount limits
    if (amount < SECURITY_LIMITS.minTransactionAmount) {
      throw new TransactionError(`Minimum transaction amount is $${SECURITY_LIMITS.minTransactionAmount}`);
    }
    if (amount > SECURITY_LIMITS.maxTransactionAmount) {
      throw new TransactionError(`Maximum transaction amount is $${SECURITY_LIMITS.maxTransactionAmount}`);
    }

    // Check daily transaction count
    const dailyKey = `daily_transactions:${userId}:${new Date().toISOString().split('T')[0]}`;
    const dailyCount = await redis.incr(dailyKey);
    await redis.expire(dailyKey, 86400); // Expire in 24 hours

    if (dailyCount > SECURITY_LIMITS.maxDailyTransactions) {
      throw new TransactionError('Daily transaction limit exceeded');
    }

    // Check daily volume
    const volumeKey = `daily_volume:${userId}:${new Date().toISOString().split('T')[0]}`;
    const currentVolume = parseFloat(await redis.get(volumeKey) || '0');
    const newVolume = currentVolume + amount;

    if (newVolume > SECURITY_LIMITS.maxDailyVolume) {
      throw new TransactionError('Daily transaction volume limit exceeded');
    }

    await redis.set(volumeKey, newVolume.toString(), 'EX', 86400);

    next();
  } catch (error) {
    next(error);
  }
}
