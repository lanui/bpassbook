import extension from '@/lib/extensionizer';
import { ENVIRONMENT_TYPE_BPEXT } from '@/corejs/enums';

import InputorController from './context-controller';

import { APITYPE_INIT_STATE } from '@/corejs/enums';

import store from '../store';

function initConnection() {
  global.extension = extension;

  const ctx = new InputorController();

  const extensionPort = extension.runtime.connect({ name: ENVIRONMENT_TYPE_BPEXT });
  console.log('extensionPort', extensionPort);

  extensionPort.onMessage.addListener(handleExtensionMessage);
}

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
