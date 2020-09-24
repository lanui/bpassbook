import EventEmitter from 'events';
import extension from '@/lib/extensionizer';
import store from '@/store';

import { BACKEND_CONN_POPUP, BACKEND_CONN_FULLSCREEN } from '@/lib/cnst/connection-cnst';
import { APITYPE_LOGIN, APITYPE_CREATE_ENV3, APITYPE_INIT_STATE } from '@/lib/cnst/api-cnst';

const LOG_PREFFIX = 'LivedManager';

/**
 * options
 * @property portName string the connect name
 * @property store optional default global store
 *
 */
class LivedManager extends EventEmitter {
  constructor(opts) {
    super();
    this.portName = opts.portName || BACKEND_CONN_POPUP;

    this.$store = opts.store || store;
    this.remotePort = extension.runtime.connect({
      name: this.portName,
      includeTlsChannelId: false,
    });
    this.remotePort.onMessage.addListener(async (message) => {
      await this.livedMessageHandler(message);
    });
  }

  //
  async sendNewWallet({ password, env3, v3, selectedAddress }) {
    this.remotePort.postMessage({
      apiType: APITYPE_CREATE_ENV3,
      data: {
        env3,
        password,
        v3,
        selectedAddress,
        nextStepId: 4,
      },
    });
  }

  async livedMessageHandler(message) {
    if (!message) return;

    /** apiType: 远端主动发起时,originApi 回消息 */
    const { apiType, originApi } = message;

    /** Response handler */
    if (originApi) {
      switch (originApi) {
        case APITYPE_CREATE_ENV3:
          if (message.error) {
            await this.$store.dispatch('app/setRemoteResponseState', { error: message.error.message });
          } else if (message.data) {
            await this.$store.dispatch('app/setRemoteResponseState', { error: '', loading: false });
            await this.$store.dispatch('app/setCreateStepid', message.data.nextStepId || 4);
          }
          break;
        default:
          break;
      }
    }

    /** Recived Message Handler */
    if (apiType && !originApi) {
      switch (apiType) {
        case APITYPE_INIT_STATE:
          await this.$store.dispatch('updateInitState', message.data);
          break;

        default:
          break;
      }
    }
  }
}

export default LivedManager;
