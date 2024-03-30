//backend/src/config/firebase.ts

import { initializeApp, cert, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = require('../../service-account-file.json');

const app: App = initializeApp({
    credential: cert(serviceAccount),
});

const auth = getAuth(app);

export { app, auth };