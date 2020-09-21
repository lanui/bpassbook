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

import {
  APITYPE_INIT_STATE,
  APITYPE_UPDATE_UNLOCKED,
  APITYPE_PWD_INCORRECT,
  APITYPE_SELECTED_PBITEM,
  APITYPE_CONTENTSCRIPTS_TRANSFER,
  APITYPE_LOGIN_PASS,
  APITYPE_REDIRECT_APP,
  APITYPE_LOGOUT,
} from './corejs/enums';

import {
  BACKEND_CONN_NAME,
  BACKEND_CONN_POPUP,
  BACKEND_CONN_FULLSCREEN,
  BACKEND_CONN_CONTENTSCRIPT,
  CLI_CONN_INPUTOR,
  CLI_CONN_INJET,
  CONN_CONTENTS_NAME,
} from '@/lib/cnst/connection-cnst.js';

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

const openTabsIDs = {};
const openTabsConnectPorts = {};

const contentScriptsPorts = {};

const clientOpenStatus = () => {
  return Boolean(popupIsOpen) || Boolean(Object.keys(openTabsIDs).length);
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

  // window.addEventListener('message', function (event) {
  //   console.log(`${LOG_PREFFIX}-Back revc Window Message>>>`, event);
  // });
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

  /**
   *
   * @param {*} remotePort
   */
  function connectRemote(remotePort) {
    const processName = remotePort.name;

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
      } else if (processName === BACKEND_CONN_FULLSCREEN) {
        const tabId = remotePort.sender.tab.id;
        openTabsIDs[tabId] = true;
      }
      const isUnlocked = Boolean(controller.appStateController.isUnlocked);
      let sendData = Object.assign({}, data, { isUnlocked: Boolean(isUnlocked) });
      console.log('send data connect>>', sendData);
      if (isUnlocked) {
        sendData = Object.assign(sendData, { BookController: { items: MOCK_PBOOK_ITEMS } });
      }
      remotePort.postMessage({ apiType: 'initState', data: sendData });
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

        //remotePort.postMessage({ apiType: 'initState', data: sendData });
        // remotePort.onMessage.addListener((msg)=>{
        //   console.log("Tab msg:",msg)
        // })
      }
    }

    remotePort.onMessage.addListener(async (msg) => {
      console.log('Report>>>>>listener>>>', remotePort);
      if (msg && msg.apiType) {
        log.warn(`recive --type:${msg.apiType}`, msg.data);
        switch (msg.apiType) {
          case APITYPE_UPDATE_UNLOCKED:
            const curstate = controller.store.getState();
            console.log('APITYPE_UPDATE_UNLOCKED', msg.data, curstate);
            if (msg.data && msg.data.password && msg.data.env3) {
              log.warn('send local...', msg.data.password, curstate.env3);
              const env3 = msg.data.env3;
              controller.store.updateState({ env3 });
              const v3 = await controller.appStateController.unlock(msg.data.password, msg.data.env3);

              if (v3) {
                const newState = getSendData();
                remotePort.postMessage({ apiType: APITYPE_INIT_STATE, data: newState, redirect: '/index' });
              } else {
                remotePort.postMessage({ apiType: APITYPE_PWD_INCORRECT, error: { message: 'password incorrect.' } });
              }
            }
            break;
          case APITYPE_LOGOUT:
            await controller.appStateController.locked();
            remotePort.postMessage({ apiType: 'initState', data: getSendData() });
            break;
          case APITYPE_SELECTED_PBITEM:
            const transData = msg.data;
            const tabId = transData.tabId;
            console.log('transData>>>>>>>>>>>', transData, tabId);
            //remotePort.postMessage({ apiType: APITYPE_CONTENTSCRIPTS_TRANSFER, data: transData });
            if (contentScriptsPorts[tabId]) {
              console.log('ContentScript>>>', contentScriptsPorts[tabId]);
              contentScriptsPorts[tabId].postMessage({ apiType: APITYPE_CONTENTSCRIPTS_TRANSFER, data: transData });
            }
            break;
          default:
            break;
        }
      }
    });

    function getSendData() {
      const storeState = controller.store.getState();
      const sendData = controller.appStateController.getAppState();
      const extendObj = {
        isUnlocked: Boolean(controller.appStateController.isUnlocked),
        selectAddress: controller.appStateController.selectAddress,
        ...controller.appStateController.store.getState(),
      };
      return Object.assign({}, storeState, sendData, extendObj);
    }
  }
}

/**
 * get state
 */
async function loadStateFromPersistence() {
  versionedData = (await $local.get()) || { meta: { version: 1 } };
  return versionedData.data;
}
