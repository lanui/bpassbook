import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';
import store from '../store';

import WhispererController from '@/lib/controllers/whisperer-controller';
import { APITYPE_FETCH_INITSTATE } from '@/lib/cnst/api-cnst.js';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes,
});

router.beforeEach(async (to, from, next) => {
  await fetchInitState();
  next();
});

async function fetchInitState() {
  const whisperer = new WhispererController({ name: 'Addor-init-whisperer', includeTlsChannelId: true });
  whisperer
    .sendSimpleMsg(APITYPE_FETCH_INITSTATE)
    .then(async (response) => {
      console.log('AddorInit&&&&&&&&&&&&&&&&&&&&&&&&&&&&>>>>>>>>>>>>', response, store);
      if (response && response.initState) {
        await store.dispatch('updateInitState', response.initState);
      }
    })
    .catch((err) => {
      console.warn('addor fetch initState fail.', err);
    });
}

export default router;
