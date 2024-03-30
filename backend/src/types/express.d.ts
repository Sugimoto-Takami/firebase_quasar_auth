// // backend/src/types/express.d.ts
// declare namespace Express {
//     export interface Request {
//         user?: Record<string, any>;
//     }
// }

// backend/src/types/express.d.ts
import { DecodedIdToken } from 'firebase-admin/auth';

declare global {
  namespace Express {
    interface Request {
      user?: DecodedIdToken;
    }
  }
}