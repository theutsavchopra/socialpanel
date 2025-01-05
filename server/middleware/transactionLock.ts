import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export async function acquireTransactionLock(
  userId: string,
  transactionId: string
): Promise<boolean> {
  const lockKey = `transaction_lock:${userId}:${transactionId}`;
  const acquired = await redis.set(lockKey, '1', 'NX', 'EX', 30); // 30 seconds lock
  return acquired === 'OK';
}

export async function releaseTransactionLock(
  userId: string,
  transactionId: string
): Promise<void> {
  const lockKey = `transaction_lock:${userId}:${transactionId}`;
  await redis.del(lockKey);
}
