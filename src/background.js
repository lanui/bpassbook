import log from 'loglevel';

import storeTransform from 'obs-store/lib/transform';
import asStream from 'obs-store/lib/asStream';
import debounce from 'debounce-stream';
import endOfStream from 'end-of-stream';
import PortStream from 'extension-port-stream';
import pump from 'pump';

import extension from '@/lib/extensionizer';
import LocalStore from '@/lib/storage/local-store';
import ContextController from '@/bglib/context-controller';
import createStreamSink from '@/lib/storage/createStreamSink';

import {
  BACKEND_CONN_POPUP,
  BACKEND_CONN_FULLSCREEN,
  BACKEND_CONN_CONTENTSCRIPT,
  CLI_CONN_INPUTOR,
} from '@/lib/cnst/connection-cnst.js';

import {
  APITYPE_INIT_STATE,
  APITYPE_CREATE_ENV3,
  APITYPE_CREATE_BPWALLET,
  APITYPE_SELECTED_PBITEM,
  APITYPE_CONTENTSCRIPTS_TRANSFER,
  APITYPE_INPUTOR_ADDITEM,
  APITYPE_UPDATE_UNLOCKED,
  APITYPE_LOGIN,
  APITYPE_LOGOUT,
  APITYPE_UPDATE_PBITEM,
  APITYPE_DELETE_PBITEM,
  APITYPE_IMPORT_BPWALLET,
  APITYPE_CREAT_IMPORT_BPWALLET,
  APITYPE_ADD_WEBSITE_ITEM,
  APITYPE_EDIT_WEBSITE_ITEM,
  APITYPE_DELETE_WEBSITE_ITEM,
  APITYPE_ADD_MOBILE_ITEM,
  APITYPE_EDIT_MOBILE_ITEM,
  APITYPE_DELETE_MOBILE_ITEM,
  APITYPE_FETCH_MATCH_ITEMS,
} from '@/lib/cnst/api-cnst';

import { responseError, responseInitState, responseMessage } from '@/lib/message-utils';

const LOG_PREFFIX = 'background';

const LOG_HEADS = {
  msgExtension: 'extension-internal',
  contentScript: 'webpage-contentscrit',
};

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
   * first connect
   * @param {*} remotePort
   */
  async function connectRemote(remotePort) {
    const processName = remotePort.name;

    console.log('cli-connection Create >>>>>', processName, remotePort.sender);

    const isInternalProcess = extensionInternalProcessHash[processName];

    const originStoreData = controller.store.getState();
    if (isInternalProcess) {
      const portStream = new PortStream(remotePort);
      // console.log('New Connection listened at Background >>originStoreData>>>', originStoreData);
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
        endOfStream(portStream, (err) => {
          delete BPTabsPort[tabId];
          console.log('closed processName>>>', processName, err);
          controller.isClientOpen = clientOpenStatus();
        });
      }

      // console.log('send data connect>>', sendData);
      let senderState = handleSender(remotePort.sender);
      let sendState = await controller.getInitState(senderState);

      remotePort.postMessage({ apiType: 'initState', data: sendState });
    } else {
      /** Website Page */
      if (remotePort.sender && remotePort.sender.tab && remotePort.sender.url) {
        const tabId = remotePort.sender.tab.id;
        const url = new URL(remotePort.sender.url);
        const { origin } = url;
        console.log(`External webpage info : ${processName}>>>>`, remotePort);
        console.log('External webpage info>>>>', tabId, remotePort.sender.tab);

        if (tabId && processName === BACKEND_CONN_CONTENTSCRIPT) {
          contentScriptsPorts[tabId] = remotePort;
          remotePort.onDisconnect.addListener(function (e) {
            // console.log('sc disconnect>>>', e);
            contentScriptsPorts[tabId] = false;
          });
          const isUnlocked = Boolean(controller.appStateController.isUnlocked);

          const respContentScriptInitState = await controller.getInitStateForContentScript(
            handleSender(remotePort.sender)
          );

          console.log(`${LOG_HEADS.contentScript}: hasloginForm>>>`, respContentScriptInitState);
          remotePort.postMessage({ apiType: 'initState', data: respContentScriptInitState });
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
   * once Message
   * @param {*} message
   * @param {*} sender
   * @param {*} sendResponse
   */
  async function handleMessage(message, sender, sendResponse) {
    console.log(`${LOG_PREFFIX}-runtime.once.message>listener>>`, message, sender);
    const { apiType } = message;
    const isFn = typeof sendResponse === 'function';

    let respInitState;
    let frameId = '',
      url = '';

    switch (apiType) {
      /**
       * will remove,see login
       */
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
              sendResponse({ error: err });
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
      /** website items begin */
      case APITYPE_INPUTOR_ADDITEM:
        controller.websiteController
          .addItem(controller.appStateController.getSubPrivateKey(), message)
          .then(async (resp) => {
            if (isFn) {
              sendResponse(await controller.getInitState(handleSender(sender)));
            }
          })
          .catch(async (error) => {
            if (isFn) {
              sendResponse(responseError(APITYPE_ADD_WEBSITE_ITEM, error));
            }
          });
        break;
      case APITYPE_ADD_WEBSITE_ITEM:
        controller.websiteController
          .addItem(controller.appStateController.getSubPrivateKey(), message)
          .then(async (resp) => {
            if (isFn) {
              sendResponse(await controller.getInitState());
            }
          })
          .catch(async (error) => {
            if (isFn) {
              sendResponse(responseError(APITYPE_ADD_WEBSITE_ITEM, error));
            }
          });
        break;
      case APITYPE_EDIT_WEBSITE_ITEM:
        controller.websiteController
          .updateItem(controller.appStateController.getSubPrivateKey(), message)
          .then(async (resp) => {
            if (isFn) {
              sendResponse(await controller.getInitState());
            }
          })
          .catch(async (error) => {
            if (isFn) {
              sendResponse(responseError(APITYPE_EDIT_WEBSITE_ITEM, error));
            }
          });
        break;
      case APITYPE_DELETE_WEBSITE_ITEM:
        controller.websiteController
          .deleteItem(controller.appStateController.getSubPrivateKey(), message)
          .then(async (resp) => {
            if (isFn) {
              sendResponse(await controller.getInitState());
            }
          })
          .catch(async (error) => {
            if (isFn) {
              sendResponse(responseError(APITYPE_DELETE_WEBSITE_ITEM, error));
            }
          });
        break;
      case APITYPE_FETCH_MATCH_ITEMS:
        if (isFn) {
          const fieldRespData = await controller.getInitStateForContentScript(handleSender(sender));
          sendResponse({ apiType: 'initState', data: fieldRespData });
        }
        break;
      // add or update mobile item
      case APITYPE_ADD_MOBILE_ITEM:
        controller.mobileController
          .addItem(controller.appStateController.getSubPrivateKey(), message)
          .then(async (resp) => {
            if (isFn) {
              sendResponse(await controller.getInitState());
            }
          })
          .catch(async (error) => {
            if (isFn) {
              sendResponse(responseError(APITYPE_ADD_MOBILE_ITEM, error));
            }
          });
        break;
      case APITYPE_DELETE_MOBILE_ITEM:
        controller.mobileController
          .deleteItem(controller.appStateController.getSubPrivateKey(), message)
          .then(async (resp) => {
            if (isFn) {
              sendResponse(await controller.getInitState());
            }
          })
          .catch(async (error) => {
            if (isFn) {
              sendResponse(responseError(APITYPE_ADD_MOBILE_ITEM, error));
            }
          });
        break;
      case APITYPE_EDIT_MOBILE_ITEM:
        controller.mobileController
          .updateItem(controller.appStateController.getSubPrivateKey(), message)
          .then(async (resp) => {
            if (isFn) {
              sendResponse(await controller.getInitState());
            }
          })
          .catch(async (error) => {
            if (isFn) {
              sendResponse(responseError(APITYPE_ADD_MOBILE_ITEM, error));
            }
          });
        break;

      case APITYPE_UPDATE_PBITEM:
        controller.gitbookController
          .addBookToStore(message.data, controller.getSelectedAddress())
          .then(async (r) => {
            console.log('>>>>>>>>>>>>>>>');
            if (isFn) {
              sendResponse(await controller.getInitState());
            }
          })
          .catch(async (err) => {
            console.log(`APITYPE_UPDATE_PBITEM >>> error>>>`, err);
            if (isFn) {
              sendResponse(await controller.getInitState());
            }
          });
        break;
      case APITYPE_DELETE_PBITEM:
        controller.gitbookController
          .deleteBookToStore(message.data, controller.getSelectedAddress())
          .then(async (r) => {
            if (isFn) {
              sendResponse(await controller.getInitState());
            }
          })
          .catch(async (err) => {
            console.log(`APITYPE_UPDATE_PBITEM >>> error>>>`, err);
            if (isFn) {
              sendResponse(await controller.getInitState());
            }
          });
        break;
      case APITYPE_IMPORT_BPWALLET:
        const resp = await controller.importBPWallet(message);
        if (isFn) {
          sendResponse(resp);
        } else {
          return false;
        }

      default:
        break;
    }

    // this handle no match message add continues constentscript message
    if (isFn) {
      return true;
    }
  }

  console.log(`${LOG_PREFFIX} - auto login for develop`, process.env);

  //auto  load test
  setTimeout(() => {
    controller.login({ apiType: APITYPE_LOGIN, data: { password: '1234', redirect: '/index' } });
  }, 2000);
}

function portMessageListener(controller, remotePort) {
  // console.log(`${LOG_PREFFIX}-runtime Msg`, remotePort);

  remotePort.onMessage.addListener(async (msg, sender) => {
    let sendInitState = await controller.getInitState();
    let respInitState;
    if (msg && msg.apiType) {
      log.warn(`recive --type:${msg.apiType}`, msg.data);
      console.log('chrome-tab>>>>>>>>>>>', sendInitState, sender);
      switch (msg.apiType) {
        case APITYPE_CREATE_BPWALLET:
        case APITYPE_CREAT_IMPORT_BPWALLET:
          respInitState = await controller.createOrImportBPWallet(msg);
          console.log('>>>>>>>>APITYPE_IMPORT_NEWBPWALLET>>', msg.data, respInitState);
          sender.postMessage(respInitState);
          break;
        case APITYPE_CREATE_ENV3:
          const saveWalletResp = await controller.saveNewWalletForLived(msg);
          sender.postMessage(saveWalletResp);
          break;
        case APITYPE_LOGIN:
          const logResp = await controller.login(msg);

          remotePort.postMessage(logResp);
          break;
        case APITYPE_SELECTED_PBITEM:
          const transData = msg.data;
          const tabId = transData.tabId;
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
          //remotePort.postMessage({ apiType: APITYPE_INIT_STATE, sendInitState})
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

function handleSender(sender) {
  if (!sender || !sender.tab || !sender.tab.url) {
    return {
      tabId: '',
      frameId: '',
      filterHost: '',
      favIconUrl: '',
    };
  }

  const { frameId, tab } = sender;

  const url = new URL(tab.url);

  return {
    tabId: tab.id,
    frameId: frameId || '',
    filterHost: url.hostname,
    favIconUrl: tab.favIconUrl || '',
  };
}
