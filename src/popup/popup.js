import Vue from 'vue';

//plugins
import vuetify from '../plugins/vuetify'

import './styles/main.css'

import App from './App';
import store from '../store';
import router from './router';
import i18n from '@/locale'
import ConnMgr from '@/corejs/connection-manager'

global.browser = require('webextension-polyfill');
const connMgr = new ConnMgr({name:'popup'})
global.connMgr = connMgr
connMgr.startup()
Vue.prototype.$browser = global.browser;


/* eslint-disable no-new */
global.p3 = new Vue({
  el: '#app',
  store,
  router,
  i18n,
  connMgr,
  vuetify,
  render: h => h(App),
});
