import PostMessageDuplexStream from 'post-message-stream';

import extension from '@/lib/extensionizer';

import InputorController from './context-controller';

import { CLI_CONN_INPUTOR } from '@/lib/cnst/connection-cnst.js';

import { APITYPE_INIT_STATE, APITYPE_SELECTED_PBITEM } from '@/lib/cnst/api-cnst';

import store from '../store';

function initConnection() {
  global.extension = extension;

  const ctx = new InputorController();

  const extensionPort = extension.runtime.connect({ name: CLI_CONN_INPUTOR });

  extensionPort.onMessage.addListener(handleExtensionMessage);

  return extensionPort;
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

  const { isUnlocked, BookController } = data;
  switch (apiType) {
    case APITYPE_INIT_STATE:
      console.log('UPDATE store', data);
      await store.dispatch('updateState', { isUnlocked, items: BookController ? BookController.items : [] });
      break;
    default:
      break;
  }
}

export default initConnection();
