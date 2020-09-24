import Vue from 'vue';
import VueRouter from 'vue-router';

import routes, { appnavs } from './routes';
import store from '@/store';
import LocalStore from '@/lib/storage/local-store';
import { getData } from '@/lib/storage';

Vue.use(VueRouter);

const VueRouterPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return VueRouterPush.call(this, location).catch((err) => err);
};
const router = new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const env3 = false;
  const isUnlocked = store.getters['isUnlocked'];
  console.log('Router checked env3>>> ', isUnlocked, env3);

  if (to.matched.some((rec) => rec.meta.auth)) {
    if (!Boolean(env3)) {
      next({
        path: '/init/welcome',
        query: { redirect: to.fullPath },
      });
    } else if (!isUnlocked) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

global.appnavs = appnavs;

async function hasWallet() {
  const local = new LocalStore();
  const d = await local.get();
  console.log('router>>>>>', d);
  if (d && d.data && d.data.env3) {
    await store.dispatch('loadBipinit', true);
    return true;
  } else {
    await store.dispatch('loadBipinit', false);
    return false;
  }
}

export default router;
