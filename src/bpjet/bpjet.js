import ResizeObserver from 'resize-observer-polyfill';
import { debounce } from 'lodash';

import PostMessageDuplexStream from 'post-message-stream';

import { getElPosition } from './inpage/ui-helper';
import { FieldsController } from './inpage/fields-controller';

import { CONN_CONTENTS_NAME, CONN_BPJET_NAME, CONN_INPUTOR_NAME, ENCODING_UTF8 } from '@/lib/cnst/connection-cnst.js';
import { INPUTOR_PAGER } from './contents';

const $ = require('jquery');
global.$ = $;

const LOG_PREFFIX = 'BP-injet';

injetStartup();

const bpassbookStream = new PostMessageDuplexStream({
  name: CONN_BPJET_NAME,
  target: CONN_CONTENTS_NAME,
});

let ctx = null;

function injetStartup() {
  window.addEventListener('DOMContentLoaded', domLoadedHandle);
}

function domLoadedHandle(event) {
  window.addEventListener('message', handleMessage);

  const initState = {
    extid: chrome.runtime.id,
    inputorURL: chrome.runtime.getURL(INPUTOR_PAGER),
  };

  const controller = new FieldsController({ initState, bpassbookStream });

  let DomSizeObs = new ResizeObserver(debounce(handleWindowResize, 100));
  if (controller.hasLoginForm) {
    DomSizeObs.observe(window.document.body);
    window.addEventListener('message', handleMessage);
  } else {
    console.log('Webpage No login field....');
  }

  function handleWindowResize(entries, observer) {
    const { document } = window;

    const state = controller.getState();
    console.log('Store get>>>', state, controller.currentTarget);
    if (controller.currentTarget) {
      const position = getElPosition(controller.currentTarget);
      console.log('namePosition>>>', position);
      controller.updatePosition(position);
    }
  }

  bpassbookStream.on('data', function (message) {
    console.log(`${LOG_PREFFIX} >>bpassbookStream on data>`, message, window.self === window.top, controller);

    if (controller.hasLoginForm && message.item) {
      console.log(`${LOG_PREFFIX} >>bpassbookStream on ctx>`, message.item, controller);
      controller.fillInputField(message.item);
    }
  });

  function handleMessage(event) {
    const { origin, source, type, data } = event;
    console.log(`${LOG_PREFFIX} =>>>handleMessage>>>`, event);
    console.log(
      `${LOG_PREFFIX} =>>>handleMessage> Recvi>>`,
      origin,
      'source>>',
      source,
      'type>>',
      type,
      'data>>>',
      data
    );
    console.log(`${LOG_PREFFIX} ===>> data`, data);
  }
}

function fillField(item, controller) {}
