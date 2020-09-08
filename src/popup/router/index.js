import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '@/store'

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

router.beforeEach((to,from,next) => {
  if( to.matched.some( rec => rec.meta.auth)) {
    const unlocked = store.state.unlocked
    if (!unlocked){
      next({
        path:'/signin',
        query:{redirect: to.fullPath}
      })
    }else {
      next()
    }
  }else {
    next()
  }
})

export default router
