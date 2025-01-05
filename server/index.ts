import express from 'express';
import cors from 'cors';
import { loadEnvConfig } from './utils/env';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import paymentRoutes from './routes/payment.routes';

const env = loadEnvConfig();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payment', paymentRoutes);

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
