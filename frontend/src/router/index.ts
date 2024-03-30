import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../boot/firebase';

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    
    onAuthStateChanged(auth, (user) => {
      if (requiresAuth && !user) {
        // 認証が必要なページに未認証のユーザーがアクセスした場合は、ログインページにリダイレクト
        next({ name: 'login' });
      } else if (user && (to.name === 'login' || to.name === 'register')) {
        // 認証済みのユーザーがログインページまたは登録ページにアクセスした場合は、メインページにリダイレクト
        next({ name: 'main' });
      } else {
        // その他の場合は、リクエストされたページに進む
        next();
      }
    });
  });

  return Router;
});
