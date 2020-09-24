import EventEmitter from 'events';

import extension from '@/lib/extensionizer';

import store from '@/store';

import { BACKEND_CONN_POPUP } from '@/lib/cnst/connection-cnst';
import { APITYPE_LOGIN, APITYPE_INIT_STATE } from '@/lib/cnst/api-cnst';

const LOG_PREFFIX = 'ConnManager';

class ConnManager extends EventEmitter {
  constructor(opts) {
    super();
    this.portName = opts.portName || BACKEND_CONN_POPUP;

    this.$store = opts.store;

    //create connection
    this.remotePort = extension.runtime.connect({
      name: this.portName,
      includeTlsChannelId: false,
    });

    this.remotePort.onMessage.addListener(async (message) => {
      await this.liveMessageHandler(message);
    });
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
}

export default ConnManager;
