import { Base64 } from 'js-base64';
Base64.extendString();

import Vue from 'vue';

//plugins
import vuetify from '../plugins/vuetify';

import './styles/main.css';

import App from './App';
import store from '../store';
import router from './router';
import i18n from '@/locale';
// import ConnectionManager from '@/corejs/connections';
import { BACKEND_CONN_POPUP } from '@/lib/cnst/connection-cnst';
import ConnManager from './controllers/connection-manager';

import Web3Client from '@/corejs/web3';
import idbMgr from '@/corejs/indexdb';
global.$idb = idbMgr;

// import { getInitChainId } from '@/corejs/local-storage-load.js'

global.browser = require('webextension-polyfill');
const web3Cli = new Web3Client();
global.web3Cli = web3Cli;

// const connection = new ConnectionManager({ portName: BACKEND_CONN_POPUP, web3Cli });

const connManager = new ConnManager({ portName: BACKEND_CONN_POPUP, store });
global.$connManager = connManager;

Vue.prototype.$browser = global.browser;
import '../assets/css/core.css';

/* eslint-disable no-new */
global.p3 = new Vue({
  el: '#app',
  store,
  router,
  i18n,
  vuetify,
  render: (h) => h(App),
});

document.addEventListener('DOMContentLoaded', async function () {
  // const chainId = await getInitChainId()
  // web3Cli.chainStore.putState(chainId)
  //p3.$store.dispatch('acc/loadBalances')
});

function appStartup(opts = {}) {}
