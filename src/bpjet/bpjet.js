import ResizeObserver from 'resize-observer-polyfill';
import { debounce } from 'lodash';

import PostMessageDuplexStream from 'post-message-stream';

import { getElPosition } from './inpage/ui-helper';
import { FieldsController, PASSWORD_SELECTOR, USERNAME_SELECTOR } from './inpage/fields-controller';

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

function injetStartup() {
  const initState = {
    extid: chrome.runtime.id,
    inputorURL: chrome.runtime.getURL(INPUTOR_PAGER),
  };
  const controller = new FieldsController({ initState });
  controller.setMaxListeners(100);
  controller.checkedLoginForm(window.document);

  if (controller && !controller.hasLoginForm) {
    controller.bindMutationObserver(window.document);
  }

  if (controller.hasLoginForm) {
    // console.log(`${LOG_PREFFIX}:ontroller State>>>`, controller);
    windowResizeObserve(controller);
    windowScrollObserve(controller);
  }

  bpassbookStream.on('data', function (message) {
    console.log(`${LOG_PREFFIX}:bpassbookStream on data>>>`, message, controller.hasLoginForm);

    if (controller.hasLoginForm && message.item) {
      // console.log(`${LOG_PREFFIX}:bpassbookStream on ctx>>>`, message.item, controller);
      controller.fillInputField(message.item);
    } else {
    }
    // console.log(`${LOG_PREFFIX} >>bpassbookStream on data>`, window);
  });

  bpassbookStream.on('end', function (message) {
    // console.log(`${LOG_PREFFIX} >>bpassbookStream on End>`, message);
  });

  /**
   * 接收 inputor message and fill it
   */
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    const { item, apiType, tab } = message;
    console.log(`${LOG_PREFFIX}-message listener Recv>>>`, message, tab);
    // console.log(`${LOG_PREFFIX}-Reciv Once Message>>>`, sender, document.querySelector('input[type="password"]'));

    const data = controller.getInputFieldData(tab);

    console.log(`${LOG_PREFFIX}-host>>>`, data);
    if (data.hasLoginForm) {
      switch (apiType) {
        case APITYPE_FILL_PBITEM:
          controller.fillInputField(message.item);
          sendResponse({ data: data.hostname });
          break;
        case APITYPE_GET_PBITEM:
          sendResponse({ data });
          break;
        default:
          break;
      }
    } else {
      return true;
    }
  });

  function getFieldFormData(controller) {
    const { hostname, origin, href } = window.location;
    const formData = {
      hasLoginForm: controller.hasLoginForm,
      username: '',
      password: '',
      hostname: hostname,
      origin: origin || href,
    };

    if (controller.targetPassword) {
      formData.password = controller.targetPassword.value;
    } else {
      const tmpPwd = document.querySelector(PASSWORD_SELECTOR);
      if (tmpPwd) formData.hasLoginForm = true;
      formData.password = tmpPwd ? tmpPwd.value : '';
    }
    if (controller.targetUserName) {
      formData.username = controller.targetUserName.value;
    } else {
      const tmpName = document.querySelector(USERNAME_SELECTOR);
      formData.username = tmpName ? tmpName.value : '';
    }

    // formData.origin = window.location.url;

    return formData;
  }
}

function windowResizeObserve(controller) {
  let DomSizeObs = new ResizeObserver(debounce(handleWindowResize, 10));
  DomSizeObs.observe(window.document.body);

  function handleWindowResize(entries, observer) {
    //console.log(`${LOG_PREFFIX}-Store get>>>`, state, entries, observer);
    if (controller.currentTarget) {
      const position = getElPosition(controller.currentTarget);
      // console.log(`${LOG_PREFFIX}-Position Changed>>>`, position);
      if (position) {
        controller.updatePosition(position);
      }
    }
  }
}

function windowScrollObserve(controller) {
  window.addEventListener('scroll', debounce(handleWindowResize, 5));

  function handleWindowResize(e) {
    if (controller.currentTarget) {
      const position = getElPosition(controller.currentTarget);
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
