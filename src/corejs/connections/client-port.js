import EventEmitter from 'events';

import extension from '@/lib/extensionizer';

import store from '@/store';

import { APITYPE_LOGIN, APITYPE_INIT_STATE, APITYPE_CREATE_ENV3 } from '@/lib/cnst/api-cnst';

class ClientConnectionPort extends EventEmitter {
  constructor(opts) {
    super();

    this.portName = opts.portName;

    const remotePort = extension.runtime.connect({ name: this.portName });
    this.remotePort = remotePort;

    remotePort.onMessage.addListener(async (message) => {
      console.log('Popup>>>Client Rec data:', message);

      if (message && message.apiType) {
        const apiType = message.apiType;

        switch (apiType) {
          case APITYPE_INIT_STATE:
            updateVuex(message.data);
            break;
          default:
            break;
        }
      }

      function updateVuex(payload) {
        store.dispatch('updateInitState', payload);
      }
    });
  }

  getRemotePort() {
    return this.remotePort;
  }

  sendNewEnv3Wallet(password, env3) {
    const remotePort = this.remotePort;
    remotePort.postMessage({ apiType: APITYPE_CREATE_ENV3, data: { password, env3 } });
  }

  /**
   *
   * @param {*} password
   */
  async login(password) {
    this.remotePort.postMessage({ apiType: APITYPE_LOGIN, data: password });
  }
}

function initState(data) {}

export default ClientConnectionPort;
