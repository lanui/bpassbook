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

import ConnectionManager from '@/corejs/connections'

global.browser = require('webextension-polyfill');
import LocalStore from '../lib/storage/local-store'
global.$localStore = new LocalStore()

import * as ethUtils from 'ethereumjs-util'
global.ethUtils = ethUtils

global.passworder = require('browser-passworder')

import extension from '@/lib/extensionizer'
global.extension = extension

Vue.prototype.$browser = global.browser
Vue.prototype.$local = new LocalStore()

const connection = new ConnectionManager({ portName: 'app' })
import dbMgr from '@/plugins/indexdb'
import Web3Client from '@/corejs/web3'
global.web3Cli = new Web3Client()

global.$conn = connection
global.dbMgr = dbMgr


global.app = new Vue({
  el:"#app",
  i18n,
  store,
  router,
  vuetify,
  render: h => h(App),
  async mounted() {
    const state = await this.$local.get()
    console.log("APP init",state)
  },
})

document.addEventListener('DOMContentLoaded',async function(){
  //await store.dispatch('loadLocalVault')
})
