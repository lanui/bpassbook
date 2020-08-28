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
  // if (to.breadcrumbs) {
  //   await store.dispatch('app/setCurrentNav', to.breadcrumbs)
  // }

  next()
})

global.appnavs = appnavs

export default router
