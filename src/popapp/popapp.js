import Vue from 'vue';
//plugins
import vuetify from '@/plugins/vuetify';

import App from './App';
import store from '@/store';
import router from './router';
import i18n from '@/locale';

import './styles/main.css';

global.$p4 = new Vue({
  el: '#p4',
  store,
  router,
  i18n,
  vuetify,
  render: (h) => h(App),
});
