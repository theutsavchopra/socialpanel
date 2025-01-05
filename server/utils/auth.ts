import crypto from 'crypto';

export function generateTempPassword(): string {
  return crypto.randomBytes(4).toString('hex').toUpperCase();
}

export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}
