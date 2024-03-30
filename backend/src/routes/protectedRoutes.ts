// backend/src/routes/protectedRoutes.ts
import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Protected data' });
});

export { router as protectedRouter };
