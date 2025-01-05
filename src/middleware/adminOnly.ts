import { Request, Response, NextFunction } from 'express';
import { auth } from '../lib/firebase-admin';

export async function adminOnly(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decodedToken = await auth.verifyIdToken(token);
    const user = await auth.getUser(decodedToken.uid);

    if (!user.customClaims?.admin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    next();
  } catch (error) {
    console.error('Admin authorization failed:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
}
