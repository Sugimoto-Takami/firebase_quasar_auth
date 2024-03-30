import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyAaZeLqSRTVCFnvjsD07BuTf0mjbl0nkCc',
    authDomain: 'quasar-auth-680de.firebaseapp.com',
    projectId: 'quasar-auth-680de',
    storageBucket: 'quasar-auth-680de.appspot.com',
    messagingSenderId: '1088064432876',
    appId: '1:1088064432876:web:1ac683887da2d42a3053c9'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };