import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '@/store';
import ExtensionStore from '@/lib/storage/local-store';

Vue.use(VueRouter);

const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return VueRouterPush.call(this, location).catch((err) => err);
};
const localState = new ExtensionStore();
const router = new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((rec) => rec.meta.auth)) {
    const locEnv = await localState.get();
    const env3 = store.getters['env3'] || (locEnv && locEnv.data ? locEnv.data.env3 : null);
    const isUnlocked = store.state.isUnlocked;
    //welcome ,signup
    if (!env3) {
      next({
        path: '/welcome',
        query: { redirect: to.fullPath },
      });
    } else if (!isUnlocked) {
      next({
        path: '/signin',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
