import { Request, Response, NextFunction } from 'express';
import { Redis } from 'ioredis';
import { TransactionError } from '../utils/errors';
import { AuditService } from '../services/audit.service';

const redis = new Redis(process.env.REDIS_URL);
const auditService = AuditService.getInstance();

const FRAUD_RULES = {
  maxFailedAttempts: 5,
  suspiciousIpThreshold: 3,
  velocityCheckWindow: 300, // 5 minutes
  maxVelocity: 5, // max 5 transactions in 5 minutes
  maxDifferentIPs: 3, // max different IPs per user per day
  maxCountries: 2, // max different countries per user per day
  unusualTimeWindow: {
    start: 23, // 11 PM
    end: 5 // 5 AM
  },
  deviceFingerprint: {
    maxDevices: 3 // max different devices per user per day
  }
};

export async function detectFraud(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.user!.id;
  const ip = req.ip;
  const userAgent = req.headers['user-agent'];
  const deviceId = req.headers['x-device-id'];
  const countryCode = req.headers['cf-ipcountry']; // Assuming Cloudflare

  try {
    await Promise.all([
      checkFailedAttempts(userId),
      checkIPActivity(ip, userId),
      checkVelocity(userId),
      checkMultipleIPs(userId, ip),
      checkMultipleCountries(userId, countryCode as string),
      checkDeviceFingerprint(userId, deviceId as string),
      checkUnusualTime(),
      checkTransactionPattern(userId, req.body.amount)
    ]);

    // Log successful fraud check
    await auditService.logSecurityEvent({
      type: 'FRAUD_CHECK',
      userId,
      status: 'success',
      metadata: {
        ip,
        userAgent,
        deviceId,
        countryCode
      }
    });

    next();
  } catch (error) {
    // Log failed fraud check
    await auditService.logSecurityEvent({
      type: 'FRAUD_CHECK',
      userId,
      status: 'failed',
      metadata: {
        ip,
        userAgent,
        deviceId,
        countryCode,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    });

    next(error);
  }
}

async function checkFailedAttempts(userId: string) {
  const failedKey = `failed_attempts:${userId}`;
  const failedAttempts = parseInt(await redis.get(failedKey) || '0');
  
  if (failedAttempts >= FRAUD_RULES.maxFailedAttempts) {
    throw new TransactionError('Account temporarily locked due to multiple failed attempts');
  }
}

async function checkIPActivity(ip: string, userId: string) {
  const ipKey = `ip_transactions:${ip}`;
  const ipCount = await redis.incr(ipKey);
  await redis.expire(ipKey, 3600);

  if (ipCount > FRAUD_RULES.suspiciousIpThreshold) {
    throw new TransactionError('Suspicious IP activity detected');
  }
}

async function checkVelocity(userId: string) {
  const velocityKey = `velocity:${userId}`;
  const velocityCount = await redis.incr(velocityKey);
  await redis.expire(velocityKey, FRAUD_RULES.velocityCheckWindow);

  if (velocityCount > FRAUD_RULES.maxVelocity) {
    throw new TransactionError('Transaction velocity limit exceeded');
  }
}

async function checkMultipleIPs(userId: string, ip: string) {
  const key = `user_ips:${userId}:${new Date().toISOString().split('T')[0]}`;
  const uniqueIPs = await redis.sadd(key, ip);
  await redis.expire(key, 86400);

  if (uniqueIPs > FRAUD_RULES.maxDifferentIPs) {
    throw new TransactionError('Access from too many different IP addresses');
  }
}

async function checkMultipleCountries(userId: string, countryCode: string) {
  if (!countryCode) return;

  const key = `user_countries:${userId}:${new Date().toISOString().split('T')[0]}`;
  const uniqueCountries = await redis.sadd(key, countryCode);
  await redis.expire(key, 86400);

  if (uniqueCountries > FRAUD_RULES.maxCountries) {
    throw new TransactionError('Access from too many different countries');
  }
}

async function checkDeviceFingerprint(userId: string, deviceId: string) {
  if (!deviceId) return;

  const key = `user_devices:${userId}:${new Date().toISOString().split('T')[0]}`;
  const uniqueDevices = await redis.sadd(key, deviceId);
  await redis.expire(key, 86400);

  if (uniqueDevices > FRAUD_RULES.deviceFingerprint.maxDevices) {
    throw new TransactionError('Access from too many different devices');
  }
}

async function checkUnusualTime() {
  const hour = new Date().getHours();
  if (hour >= FRAUD_RULES.unusualTimeWindow.start || hour <= FRAUD_RULES.unusualTimeWindow.end) {
    // Don't block but flag for review
    await auditService.logSecurityEvent({
      type: 'UNUSUAL_TIME_TRANSACTION',
      status: 'flagged',
      metadata: { hour }
    });
  }
}

async function checkTransactionPattern(userId: string, amount: number) {
  const key = `user_transactions:${userId}:${new Date().toISOString().split('T')[0]}`;
  const transactions = await redis.lrange(key, 0, -1);
  await redis.lpush(key, amount.toString());
  await redis.expire(key, 86400);

  // Check for repetitive amounts
  const repetitiveCount = transactions.filter(t => parseFloat(t) === amount).length;
  if (repetitiveCount >= 3) {
    throw new TransactionError('Suspicious transaction pattern detected');
  }
}
