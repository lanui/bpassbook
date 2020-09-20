import Vue from 'vue';
import vuetify from '../plugins/vuetify';

import App from './App.vue';

import i18n from '@/locale';
import store from './store';

//
import remotePort from './controller';
global.$remotePort = remotePort;

global.$inputor = new Vue({
  el: '#RootInputor',
  i18n,
  store,
  vuetify,
  render: (h) => h(App),
});
