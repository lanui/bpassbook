import Vue from 'vue';
import vuetify from '../plugins/vuetify';

import App from './App.vue';

import i18n from '@/locale';
import store from './store';
import router from './router';

global.$addor = new Vue({
  el: '#RootAddor',
  i18n,
  store,
  router,
  vuetify,
  render: (h) => h(App),
});
