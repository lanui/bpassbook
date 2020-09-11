import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '@/store'

import { hasEnv3, getData } from '@/lib/storage'

Vue.use(VueRouter);

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return VueRouterPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes,
});

router.beforeEach(async (to,from,next) => {
  const ret = await getData()
  const { env3 } = ret.data
  const isUnlocked = store.state.isUnlocked
  // console.log("has env3>>>", ret, isUnlocked)
  if( to.matched.some( rec => rec.meta.auth)) {

    if (!env3){
      next({
        path: '/welcome',
        query: { redirect: to.fullPath }
      })
    } else if (!isUnlocked){
      next({
        path: '/signin',
        query: { redirect: to.fullPath }
      })
    }else {
      next()
    }
  }else {
    next()
  }
})

export default router
