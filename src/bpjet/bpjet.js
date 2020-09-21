import ResizeObserver from 'resize-observer-polyfill';
import { debounce } from 'lodash';

import PostMessageDuplexStream from 'post-message-stream';

import { getElPosition } from './inpage/ui-helper';
import { FieldsController, checkFormFields } from './inpage/fields-controller';

// import { CONN_CONTENTS_NAME, CONN_BPJET_NAME, CONN_INPUTOR_NAME, ENCODING_UTF8 } from '@/lib/cnst/connection-cnst.js';
import { INPUTOR_PAGER } from './contents';

const $ = require('jquery');
global.$ = $;

const LOG_PREFFIX = 'BP-injet';

// const bpassbookStream = new PostMessageDuplexStream({
//   name: CONN_BPJET_NAME,
//   target: CONN_CONTENTS_NAME,
// });
injetStartup();

let ctx = null;

function injetStartup() {
  const initState = {
    extid: chrome.runtime.id,
    inputorURL: chrome.runtime.getURL(INPUTOR_PAGER),
  };
  const controller = new FieldsController({ initState });
  controller.checkedLoginForm(window.document);

  if (controller.hasLoginForm) {
    console.log(`${LOG_PREFFIX}- document>>>`, controller.getState());
    windowResizeObserve(controller);
  }

  // window.addEventListener('DOMContentLoaded', domLoadedHandle);

  // chrome.runtime.onConnect.addListener(function (inputorPort){
  //   const { name } = inputorPort
  //   console.log(`${LOG_PREFFIX} >>> an inputor connected`,name)
  // })

  // chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  //   // console.log(`${LOG_PREFFIX}-message listener>>>`, message)
  //   // console.log(`${LOG_PREFFIX}-message sender>>>`, sender)
  //   // console.log(`${LOG_PREFFIX}-message sendResponse>>>`, sendResponse({ resp: 'ok' }))
  //   // console.log(`${LOG_PREFFIX}-message document>>>`, document.querySelector('#fm-login-id'))

  // })
}

function windowResizeObserve(controller) {
  let DomSizeObs = new ResizeObserver(debounce(handleWindowResize, 50));
  DomSizeObs.observe(window.document.body);

  function handleWindowResize(entries, observer) {
    const state = controller.getState();
    console.log(`${LOG_PREFFIX}-Store get>>>`, state, entries, observer);
    if (controller.currentTarget) {
      const position = getElPosition(controller.currentTarget);
      console.log(`${LOG_PREFFIX}-Position>>>`, position);
      if (position) {
        controller.updatePosition(position);
      }
    }
  }
}

function domLoadedHandle(event) {
  console.log(`${LOG_PREFFIX}-`, event);

  // window.addEventListener('message', handleMessage);

  // let DomSizeObs = new ResizeObserver(debounce(handleWindowResize, 100));
  // if (controller.hasLoginForm) {
  //   DomSizeObs.observe(window.document.body);
  //   window.addEventListener('message', handleMessage);
  // } else {
  //   console.log('Webpage No login field....');
  // }

  // function handleWindowResize(entries, observer) {
  //   const state = controller.getState();
  //   // console.log('Store get>>>', state, controller.currentTarget);
  //   if (controller.currentTarget) {
  //     const position = getElPosition(controller.currentTarget);
  //     // console.log('namePosition>>>', position);
  //     controller.updatePosition(position);
  //   }
  // }

  // bpassbookStream.on('data', function (message) {
  //   // console.log(`${LOG_PREFFIX} >>bpassbookStream on data>`, message, window.self === window.top, controller);

  //   if (controller.hasLoginForm && message.item) {
  //     // console.log(`${LOG_PREFFIX} >>bpassbookStream on ctx>`, message.item, controller);
  //     controller.fillInputField(message.item);
  //   }
  // });

  // function handleMessage(event) {
  //   const { origin, source, type, data } = event;
  //   // console.log(`${LOG_PREFFIX} =>>>handleMessage>>>`, event);
  //   // console.log(
  //   //   `${LOG_PREFFIX} =>>>handleMessage> Recvi>>`,
  //   //   origin,
  //   //   'source>>',
  //   //   source,
  //   //   'type>>',
  //   //   type,
  //   //   'data>>>',
  //   //   data
  //   // );
  //   // console.log(`${LOG_PREFFIX} ===>> data`, data);
  // }
}

function fillField(item, controller) {}
