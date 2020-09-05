import Vue from 'vue'
import VueRouter from 'vue-router'
import routes, { appnavs } from './routes'
import store from '@/store'

Vue.use(VueRouter)

const VueRouterPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return VueRouterPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

router.beforeEach(async (to,from,next) => {
  if(to.matched.some(rec => rec.meta.auth)){
    const v3 = store.getters['v3']
    const unlocked = store.getters['unlocked']
    console.log(">>>>>", v3, unlocked)
    if (!v3) {
      next({
        path: '/init/welcome',
        query: { redirect: to.fullPath }
      })
    } else if (!unlocked){
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }else {
      next()
    }
  }else {
    next()
  }

})

global.appnavs = appnavs

export default router
