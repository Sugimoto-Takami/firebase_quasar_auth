// backend/src/server.ts

import express from 'express';
// アプリケーション起動時に、firebase Admin が初期化
import './config/firebase';
import cors from 'cors';
import { authMiddleware } from './middlewares/authMiddleware';
import { protectedRouter } from './routes/protectedRoutes';

const app = express();

// corsの設定
app.use(cors({
  origin: 'http://localhost:9000',
  methods: "GET, POST, DELETE",
  allowedHeaders: "Content-Type, Authorization"
}));

// ミドルウェアの設定
app.use(express.json());
app.use(authMiddleware);

// ルーティングの設定
app.use('/api', protectedRouter);

// サーバの起動
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});