import Vue from 'vue';
import vuetify from '../plugins/vuetify';

import App from './App.vue';

import i18n from '@/locale';

global.$inputor = new Vue({
  el: '#RootInputor',
  i18n,
  vuetify,
  render: (h) => h(App),
});
