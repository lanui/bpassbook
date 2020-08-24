import Vue from 'vue';

//plugins
import vuetify from '../plugins/vuetify'

import './styles/main.css'

import App from './App';
import store from '../store';
import router from './router';

global.browser = require('webextension-polyfill');

Vue.prototype.$browser = global.browser;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  vuetify,
  render: h => h(App),
});
