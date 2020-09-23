import log from 'loglevel';

import storeTransform from 'obs-store/lib/transform';
import asStream from 'obs-store/lib/asStream';
import debounce from 'debounce-stream';
import endOfStream from 'end-of-stream';
import PortStream from 'extension-port-stream';

import extension from '@/lib/extensionizer';
import LocalStore from '@/lib/storage/local-store';
import ContextController from '@/corejs/context-controller';
import createStreamSink from '@/lib/storage/createStreamSink';

import { APITYPE_PWD_INCORRECT } from './corejs/enums';

import {
  BACKEND_CONN_POPUP,
  BACKEND_CONN_FULLSCREEN,
  BACKEND_CONN_CONTENTSCRIPT,
  CLI_CONN_INPUTOR,
} from '@/lib/cnst/connection-cnst.js';

import {
  APITYPE_INIT_STATE,
  APITYPE_CREATE_ENV3,
  APITYPE_SELECTED_PBITEM,
  APITYPE_CONTENTSCRIPTS_TRANSFER,
  APITYPE_INPUTOR_ADDITEM,
  APITYPE_UPDATE_UNLOCKED,
  APITYPE_LOGOUT,
  APITYPE_UPDATE_PBITEM,
  APITYPE_DELETE_PBITEM,
} from '@/lib/cnst/api-cnst';

import { MOCK_PBOOK_ITEMS } from '@/mocks/bp-items-mock';

import pump from 'pump';

const LOG_PREFFIX = 'background';

global.browser = require('webextension-polyfill');

global.extension = extension;

global.$local = new LocalStore();

// alert(`Hello ${store.getters.foo}!`);
/** global variables */
let popupIsOpen = false;

let versionedData;

const openTabsConnectPorts = {};

const contentScriptsPorts = {};
//Inputor Connnection
const BPTabsPort = {};

const clientOpenStatus = () => {
  return Boolean(popupIsOpen) || Boolean(Object.keys(BPTabsPort).length);
};

const extensionInternalProcessHash = {
  [BACKEND_CONN_POPUP]: true,
  [BACKEND_CONN_FULLSCREEN]: true,
  [CLI_CONN_INPUTOR]: true,
};

initialize().catch(log.error);

async function initialize() {
  const initState = await loadStateFromPersistence();
  console.log(`${LOG_PREFFIX}-Back initState>>>`, initState);
  setupController(initState || {});
}

async function setupController(initState) {
  const controller = new ContextController({
    initState,
  });
  global.ctx = controller;

  pump(
    asStream(controller.store),
    debounce(1000),
    storeTransform(versionifyData),
    createStreamSink(persistData),
    (err) => {
      log.error('Save persist data error', err);
    }
  );

  function versionifyData(state) {
    versionedData.data = state;

    return versionedData;
  }

  async function persistData(state) {
    console.log('persistData', state);
    if (!state) {
      throw new Error('state is missing');
    }

    if (!state.data) {
      throw new Error('data is missing');
    }

    if ($local.isSupported) {
      try {
        await $local.set(state);
      } catch (err) {
        log.error('error setting state in local store:', err);
      }
    }
  }

  //
  extension.runtime.onConnect.addListener(connectRemote);
  extension.runtime.onMessage.addListener(handleMessage);

  /**
   *
   * @param {*} remotePort
   */
  function connectRemote(remotePort) {
    const processName = remotePort.name;

    console.log('cli-connection Create >>>>>', processName, remotePort.sender);

    const isInternalProcess = extensionInternalProcessHash[processName];

    const data = controller.store.getState();
    if (isInternalProcess) {
      const portStream = new PortStream(remotePort);
      console.log('New Connection listened at Background >>>>>', processName, data);
      console.log('New Connection listened at Background from sender>>>>>', remotePort.sender);

      if (processName === BACKEND_CONN_POPUP) {
        popupIsOpen = true;
        endOfStream(portStream, () => {
          popupIsOpen = false;
          controller.isClientOpen = clientOpenStatus();
        });
      }

      if (processName === CLI_CONN_INPUTOR || processName === BACKEND_CONN_FULLSCREEN) {
        const tabId = remotePort.sender.tab.id;
        BPTabsPort[tabId] = true;
        endOfStream(portStream, () => {
          delete BPTabsPort[tabId];
          controller.isClientOpen = clientOpenStatus();
        });
      }
      const isUnlocked = Boolean(controller.appStateController.isUnlocked);

      // console.log('send data connect>>', sendData);
      let sendState = controller.getInitState();

      remotePort.postMessage({ apiType: 'initState', data: sendState });
    } else {
      if (remotePort.sender && remotePort.sender.tab && remotePort.sender.url) {
        const tabId = remotePort.sender.tab.id;
        const url = new URL(remotePort.sender.url);
        const { origin } = url;
        console.log('External webpage info>>>>', remotePort);
        console.log('External webpage info>>>>', tabId, url, origin, processName);

        if (tabId && processName === BACKEND_CONN_CONTENTSCRIPT) {
          contentScriptsPorts[tabId] = remotePort;
          remotePort.onDisconnect.addListener(function (e) {
            console.log('sc disconnect>>>', e);
            contentScriptsPorts[tabId] = false;
          });
          const isUnlocked = Boolean(controller.appStateController.isUnlocked);
          remotePort.postMessage({ apiType: 'initState', data: { isUnlocked } });
        } else {
        }

        // remotePort.postMessage({ apiType: 'initState', data: sendData });
        // remotePort.onMessage.addListener((msg)=>{
        //   console.log("Tab msg:",msg)
        // })
      }
    }

    portMessageListener(controller, remotePort);
  }

  /**
   *
   * @param {*} message
   * @param {*} sender
   * @param {*} sendResponse
   */
  function handleMessage(message, sender, sendResponse) {
    console.log(`${LOG_PREFFIX}-runtime.message>listener>>`, message, sender);
    const { apiType } = message;
    const isFn = typeof sendResponse === 'function';
    switch (apiType) {
      case APITYPE_CREATE_ENV3:
        controller
          .createWalletData(message.data)
          .then(async (resp) => {
            if (isFn) {
              sendResponse(resp);
            }
          })
          .catch((err) => {
            sendResponse({ error: err.message });
          });
        break;
      case APITYPE_UPDATE_UNLOCKED:
        controller
          .unlocked(message.password)
          .then((resp) => {
            console.log(`${LOG_PREFFIX}`, resp);
            if (isFn) {
              sendResponse(resp);
            }
          })
          .catch((err) => {
            if (isFn) {
              sendResponse({ error: err.message });
            }
          });
        break;
      case APITYPE_LOGOUT:
        controller.appStateController.locked().then((resp) => {
          if (isFn) {
            sendResponse(controller.getInitState());
          }
        });
        break;
      case APITYPE_INPUTOR_ADDITEM:
        controller.gitbookController
          .addBookToStore(message.data, controller.getSelectedAddress())
          .then(async (resp) => {
            if (isFn && resp) {
              sendResponse(controller.getInitState());
            }
          })
          .catch((err) => {
            if (isFn && err) {
              sendResponse(controller.getInitState());
            }
          });
        break;
      case APITYPE_UPDATE_PBITEM:
        controller.gitbookController
          .addBookToStore(message.data, controller.getSelectedAddress())
          .then((r) => {
            if (isFn) {
              sendResponse(controller.getInitState());
            }
          })
          .catch((err) => {
            console.log(`APITYPE_UPDATE_PBITEM >>> error>>>`, err);
            if (isFn) {
              sendResponse(controller.getInitState());
            }
          });
        break;
      case APITYPE_DELETE_PBITEM:
        controller.gitbookController
          .deleteBookToStore(message.data, controller.getSelectedAddress())
          .then((r) => {
            if (isFn) {
              sendResponse(controller.getInitState());
            }
          })
          .catch((err) => {
            console.log(`APITYPE_UPDATE_PBITEM >>> error>>>`, err);
            if (isFn) {
              sendResponse(controller.getInitState());
            }
          });
        break;
      default:
        break;
    }
  }
}

function portMessageListener(controller, remotePort) {
  // console.log(`${LOG_PREFFIX}-runtime Msg`, controller);
  remotePort.onMessage.addListener(async (msg) => {
    // console.log('Report>>>>>listener>>>', remotePort);
    if (msg && msg.apiType) {
      log.warn(`recive --type:${msg.apiType}`, msg.data);
      switch (msg.apiType) {
        case APITYPE_SELECTED_PBITEM:
          const transData = msg.data;
          const tabId = transData.tabId;
          console.log('transData:>>>>>>>>>>>', transData, tabId);
          console.log('chrome-tab>>>>>>>>>>>', transData, tabId, remotePort);

          //remotePort.postMessage({ apiType: APITYPE_CONTENTSCRIPTS_TRANSFER, data: transData });
          if (contentScriptsPorts[tabId]) {
            console.log('transData:ContentScript>>>', contentScriptsPorts[tabId]);
            contentScriptsPorts[tabId].postMessage({ apiType: APITYPE_CONTENTSCRIPTS_TRANSFER, data: transData });
          }
          break;
        // case APITYPE_INPUTOR_ADDITEM:
        //   console.log(APITYPE_INPUTOR_ADDITEM, 'addItem>>>', contentScriptsPorts[tabId]);
        //   if (msg.data && msg.data.item && controller.getSelectedAddress()) {
        //     controller.gitbookController.addBookToStore(msg.data.item, controller.getSelectedAddress());
        //   }
        //   break;
        default:
          break;
      }
    }
  });
}

/**
 * get state
 */
async function loadStateFromPersistence() {
  versionedData = (await $local.get()) || { meta: { version: 1 } };
  return versionedData.data;
}
