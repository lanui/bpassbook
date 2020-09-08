import Vue from 'vue';

//plugins
import vuetify from '../plugins/vuetify'

import './styles/main.css'

import App from './App';
import store from '../store';
import router from './router';
import i18n from '@/locale'
import ConnectionManager from '@/corejs/connections'

global.browser = require('webextension-polyfill');

const $conn = new ConnectionManager({portName:'popup'})
global.$conn = $conn

Vue.prototype.$browser = global.browser;

/* eslint-disable no-new */
global.p3 = new Vue({
  el: '#app',
  store,
  router,
  i18n,
  vuetify,
  render: h => h(App),
});
