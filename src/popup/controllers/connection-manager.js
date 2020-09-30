import EventEmitter from 'events';

import extension from '@/lib/extensionizer';

import store from '@/store';

import { BACKEND_CONN_POPUP } from '@/lib/cnst/connection-cnst';
import { GenerateWalletAndOpen } from '@/bglib/account-creator';

import {
  APITYPE_LOGIN,
  APITYPE_INIT_STATE,
  APITYPE_CREAT_IMPORT_BPWALLET,
  APITYPE_CREATE_BPWALLET,
} from '@/lib/cnst/api-cnst';

const LOG_PREFFIX = 'ConnManager';

class ConnManager extends EventEmitter {
  constructor(opts) {
    super();
    this.portName = opts.portName || BACKEND_CONN_POPUP;

    this.$store = opts.store;
    this.$router = opts.router || null;

    //create connection
    this.remotePort = extension.runtime.connect({
      name: this.portName,
      includeTlsChannelId: false,
    });

    this.remotePort.onMessage.addListener(async (message) => {
      await this.liveMessageHandler(message);
    });
  }

  setRouter(router) {
    this.$router = router;
  }

  async liveMessageHandler(message) {
    console.log(`${LOG_PREFFIX} >>live connection reciv MSG>>>`, message);

    //first connection
    if (message && message.apiType) {
      switch (message.apiType) {
        case APITYPE_INIT_STATE:
          await this.$store.dispatch('updateInitState', message.data);
          break;
        default:
          break;
      }
    }

    if (message && message.originApi) {
      switch (message.originApi) {
        case APITYPE_LOGIN:
          if (message.error) {
            await this.$store.dispatch('setLoginError', message.error.message);
          }
          break;
        case APITYPE_CREATE_BPWALLET:
          if (message.error) {
            await this.$store.dispatch('p3/setCreatingState', { error: message.error.message });
          } else {
            await this.$store.dispatch('updateInitState', message.data);
          }
          break;
        case APITYPE_CREAT_IMPORT_BPWALLET:
          if (message.error) {
            await this.$store.dispatch('p3/setCreatingState', { error: message.error.message });
          } else {
            await this.$store.dispatch('updateInitState', message.data);
          }
          break;
        default:
          break;
      }
    }
  }

  async login(password) {
    this.$store.commit('SET_LOGINLOADING', true);
    this.remotePort.postMessage({
      apiType: APITYPE_LOGIN,
      data: {
        password,
        redirect: '/index',
      },
    });
  }

  async createNewWallet(password) {
    if (!this.remotePort) throw 'remote connection disconnect.';

    const fullWallet = await GenerateWalletAndOpen(password);
    const { env3, dev3 } = fullWallet;

    this.remotePort.postMessage({
      apiType: APITYPE_CREATE_BPWALLET,
      data: {
        env3,
        dev3,
        password,
        redirect: '/index',
      },
    });
    return true;
  }

  async createOrImportWallet({ env3, dev3, password }) {
    if (!this.remotePort) throw 'remote connection disconnect.';
    this.remotePort.postMessage({
      apiType: APITYPE_CREAT_IMPORT_BPWALLET,
      data: {
        env3,
        dev3,
        password,
        redirect: '/index',
      },
    });
    return true;
  }
}

export default ConnManager;
