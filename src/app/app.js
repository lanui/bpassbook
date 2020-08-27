/**
 * App entry js
 *
 */
import Vue from 'vue'

import vuetify from '../plugins/vuetify'

import App from './App.vue'
import store from '../store';
import router from './router';

global.browser = require('webextension-polyfill');

Vue.prototype.$browser = global.browser

global.bpvue = new Vue({
  el:"#app",
  store,
  router,
  vuetify,
  render: h => h(App),
  mounted() {

  },
})

// document.addEventListener('DOMContentLoaded',function)
