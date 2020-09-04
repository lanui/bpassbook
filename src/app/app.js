/**
 * App entry js
 *
 */
import Vue from 'vue'

import vuetify from '../plugins/vuetify'

import App from './App.vue'
import store from '../store';
import router from './router';

import i18n from '@/locale'

global.browser = require('webextension-polyfill');
import LocalStore from '../lib/storage/local-store'
global.$localStore = new LocalStore()

Vue.prototype.$browser = global.browser

global.bpvue = new Vue({
  el:"#app",
  i18n,
  store,
  router,
  vuetify,
  render: h => h(App),
  mounted() {

  },
})

// document.addEventListener('DOMContentLoaded',function)
