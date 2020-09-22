import PostMessageDuplexStream from 'post-message-stream';

import extension from '@/lib/extensionizer';

import InputorController from './context-controller';

import { CLI_CONN_INPUTOR } from '@/lib/cnst/connection-cnst.js';

import { APITYPE_INIT_STATE, APITYPE_SELECTED_PBITEM, APITYPE_INPUTOR_ADDITEM } from '@/lib/cnst/api-cnst';

import store from '../store';

const LOG_PREFFIX = 'Inputor:controller-';

function initConnection() {
  global.extension = extension;

  // const ctx = new InputorController();

  const extensionPort = extension.runtime.connect({ name: CLI_CONN_INPUTOR });

  extensionPort.onMessage.addListener(handleExtensionMessage);

  return {
    sendAddItemOnce(item, cb) {
      console.log(`${LOG_PREFFIX}>sendAddItemOnce>>>`, item, extensionPort);

      const message = {
        apiType: APITYPE_INPUTOR_ADDITEM,
        data: { item },
      };
      extensionPort.postMessage(message);
    },
  };
}

export function sendMessage(port, data) {
  const message = {
    apiType: APITYPE_SELECTED_PBITEM,
    data,
  };
  port.postMessage(message);
}

/**
 *
 * @param {*} req
 * @param {*} sender
 * @param {*} sendResp
 */
async function handleExtensionMessage(req, sender, sendResp) {
  console.log('req', req, sender, sendResp);
  const { apiType, data } = req;
  if (!data) return;

  const { isUnlocked, BookController, AppStateController } = data;
  const selectedAddress = AppStateController?.selectedAddress || '';
  switch (apiType) {
    case APITYPE_INIT_STATE:
      console.log('UPDATE store recvie>>>>', data);
      await store.dispatch('updateState', {
        isUnlocked,
        selectedAddress,
        items: BookController ? BookController.items : [],
      });
      break;
    default:
      break;
  }
}

export default initConnection();
