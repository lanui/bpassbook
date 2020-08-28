import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);
VueRouter.prototype.push = function push(location) {
  return VueRouterPush.call(this, location).catch(err => err)
}

export default new VueRouter({
  mode:'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes,
});
