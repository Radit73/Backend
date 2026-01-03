import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import logRoutes from './routes/logRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import subscribeRoutes from './routes/subscribeRoutes.js';
import emojiRoutes from './routes/emojiRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import './config/supabase.js';

dotenv.config();

const app = express();

const allowedOrigins = (process.env.CORS_ORIGINS || '*')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Game Lokal ID API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api', reviewRoutes);
app.use('/api', logRoutes);
app.use('/api', analyticsRoutes);
app.use('/api', subscribeRoutes);
app.use('/api', emojiRoutes);
app.use('/api', chatRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
