// backend/src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebase';
// 型定義のため
import { DecodedIdToken } from 'firebase-admin/auth';

interface AuthenticatedRequest extends Request {
    user?: DecodedIdToken;
}

// req: Request から修正
export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        // "Bearer"の部分を取り除く.
        const token = authHeader.split(' ')[1];
        
        try {
            console.log(0);
            // ここでエラー（取得できない）
            const decodedToken = await auth.verifyIdToken(token);

            // test
            console.log(1);
            console.log(decodedToken);

            req.user = decodedToken;
            next();
        } catch (error) {
            console.error('Error verifying JWT:', error);
            res.status(401).json({ message: 'Unauthorized' });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};