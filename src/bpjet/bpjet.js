import ResizeObserver from 'resize-observer-polyfill';
import { debounce } from 'lodash';

import PostMessageDuplexStream from 'post-message-stream';

import { getElPosition } from './inpage/ui-helper';
import { FieldsController } from './inpage/fields-controller';

import { BACKEND_CONN_CONTENTSCRIPT, CLI_CONN_INJET } from '@/lib/cnst/connection-cnst.js';
import { APITYPE_FILL_PBITEM, APITYPE_GET_PBITEM } from '@/lib/cnst/api-cnst.js';

import { INPUTOR_PAGER } from './contents';

const $ = require('jquery');
global.$ = $;

const LOG_PREFFIX = 'BP-injet';

const bpassbookStream = new PostMessageDuplexStream({
  name: CLI_CONN_INJET,
  target: BACKEND_CONN_CONTENTSCRIPT,
});

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
    console.log(`${LOG_PREFFIX}:ontroller State>>>`, controller.getState());
    windowResizeObserve(controller);
  }

  bpassbookStream.on('data', function (message) {
    console.log(`${LOG_PREFFIX}:bpassbookStream on data>>>`, message, controller.hasLoginForm);

    if (controller.hasLoginForm && message.item) {
      console.log(`${LOG_PREFFIX}:bpassbookStream on ctx>>>`, message.item, controller);
      controller.fillInputField(message.item);
    } else {
    }
    console.log(`${LOG_PREFFIX} >>bpassbookStream on data>`, window);
  });

  bpassbookStream.on('end', function (message) {
    console.log(`${LOG_PREFFIX} >>bpassbookStream on End>`, message);
  });

  /**
   * 接收 inputor message and fill it
   */
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    const { item, apiType } = message;
    console.log(`${LOG_PREFFIX}-message listener Recv>>>`, apiType, item, controller.hasLoginForm);
    console.log(`${LOG_PREFFIX}-sender>>>`, sender);
    if (controller.hasLoginForm) {
      const { hostname, origin } = window.location;
      console.log(`${LOG_PREFFIX}-host>>>`, hostname, origin);
      switch (apiType) {
        case APITYPE_FILL_PBITEM:
          controller.fillInputField(message.item);
          sendResponse({ data: hostname });
          break;
        case APITYPE_GET_PBITEM:
          const data = controller.getInputFieldData();
          data.hostname = hostname;
          data.origin = origin;
          sendResponse({ data });
          break;
        default:
          break;
      }

      console.log(`${LOG_PREFFIX}-host>>>`, window.location.hostname);
    }
  });
}

function windowResizeObserve(controller) {
  let DomSizeObs = new ResizeObserver(debounce(handleWindowResize, 50));
  DomSizeObs.observe(window.document.body);

  function handleWindowResize(entries, observer) {
    const state = controller.getState();
    //console.log(`${LOG_PREFFIX}-Store get>>>`, state, entries, observer);
    if (controller.currentTarget) {
      const position = getElPosition(controller.currentTarget);
      console.log(`${LOG_PREFFIX}-Position Changed>>>`, position);
      if (position) {
        controller.updatePosition(position);
      }
    }
  }
}

function domLoadedHandle(event) {
  console.log(`${LOG_PREFFIX}-`, event);
}

function fillField(item, controller) {}
