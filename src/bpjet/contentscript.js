import pump from 'pump';
import PostMessageDuplexStream from 'post-message-stream';
import ObjectMultiplex from 'obj-multiplex';
import PortStream from 'extension-port-stream';

import ext from '../lib/extensionizer';

import { name } from '../../package.json';

import { CONN_CONTENTS_NAME, CONN_BPJET_NAME, ENCODING_UTF8 } from '@/lib/cnst/connection-cnst.js';
import { APITYPE_CONTENTSCRIPTS_TRANSFER } from '@/corejs/enums';

import { CHANNEL_INJET_CONTENTSCRIPT, CHANNEL_CONTENTSCRIPT_INJET } from '@/corejs/enums';

const LOG_PREFFIX = 'BP-contentScript';
const injetContent = 'const BPassword="v1.1;"';

const extName = name || 'BPassword';

if (shouldInjectController()) {
  injectCss();
  injectScript(injetContent);
  startup();
}

async function startup() {
  setupStream();
  await domIsReady();
}

function setupMessage() {
  //window.ad
}

async function setupStream() {
  //创建
  const pageStream = new PostMessageDuplexStream({
    name: CONN_CONTENTS_NAME,
    target: CHANNEL_INJET_CONTENTSCRIPT,
  });

  const extid = chrome.runtime.id;
  // console.log(`${LOG_PREFFIX} >setupStream>>`, ext);
  pageStream._write('shift from contentscript.........' + extid, ENCODING_UTF8, function (e) {
    console.log(`${LOG_PREFFIX} >>send callback>>`, e, this);
  });

  // {active:true,currentWindow:true}

  //connect channel muxers
  //创建并连接通道复用器，以便可以分别处理channels
  const pageMux = new ObjectMultiplex();
  pageMux.setMaxListeners(25);

  //
  pump(pageMux, pageStream, pageMux, (err) => logStreamDisconnectWarning(`${extName} Injet Multiplex`, err));

  //与background 交互长连接
  const extensionPort = ext.runtime.connect({ name: CONN_CONTENTS_NAME });

  extensionPort.onMessage.addListener(function (message, sender) {
    const { apiType, data } = message;
    switch (apiType) {
      case APITYPE_CONTENTSCRIPTS_TRANSFER:
        console.log(`${LOG_PREFFIX} extensionPort.onMessage.addListener switch>>>`, apiType, data);
        console.log(`${LOG_PREFFIX} >>`, window);
        pageStream._write(data, ENCODING_UTF8, (resp) => {
          console.log(`${LOG_PREFFIX}>>>>` + 'extensionPort.onMessage.addListener success');
        });
        break;

      default:
        break;
    }
    //APITYPE_CONTENTSCRIPTS_TRANSFER
  });

  const extensionStream = new PortStream(extensionPort);
  console.log('>>extensionPort>>', extensionPort, extensionStream);
  const extensionMux = new ObjectMultiplex();
  extensionMux.setMaxListeners(25);
  pump(extensionMux, extensionStream, extensionMux, (err) =>
    logStreamDisconnectWarning(`${extName} Background Multiplex`, err)
  );

  // 转发流 给backgrund js
  forwardTrafficBetweenMuxers('baseConfig', pageMux, extensionMux);
}

function forwardTrafficBetweenMuxers(channelName, muxA, muxB) {
  const channelA = muxA.createStream(channelName);
  const channelB = muxB.createStream(channelName);

  pump(channelA, channelB, channelA, (err) =>
    logStreamDisconnectWarning(`extName muxed traffic for channel "${channelName}" failed`, err)
  );
}

/**
 *
 */
function injectCss() {
  try {
    const container = document.head || document.documentElement;
    const url = ext.runtime.getURL('share/css/injet.css');
    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = url;
    container.insertBefore(style, container.children[0]);
  } catch (e) {
    console.error(`${extName} inject css error`, e);
  }
}

function injectScript() {
  try {
    const url = ext.runtime.getURL('bpjet/bpjet.js');
    // console.log(">>>>>>URL>>>", url)
    const container = document.head || document.documentElement;
    const scriptEl = document.createElement('script');
    scriptEl.setAttribute('async', 'false');
    scriptEl.src = url;

    scriptEl.onload = function () {
      this.parentNode.removeChild(this);
    };
    container.appendChild(scriptEl);
  } catch (e) {
    console.error(`${extName} inject script error`, e);
  }
}

function shouldInjectController() {
  return doctypeCheck() && suffixCheck() && domElementCheck();
}

function doctypeCheck() {
  const doctype = window.document.doctype;
  if (doctype) {
    return doctype.name === 'html';
  } else {
    return true;
  }
}

function suffixCheck() {
  const uninjectTypes = [/\.xml$/, /\.pdf$/];

  const currentUrl = window.location.pathname;

  for (let i = 0; i < uninjectTypes.length; i++) {
    if (uninjectTypes[i].test(currentUrl)) {
      return false;
    }
  }

  return true;
}

function domElementCheck() {
  const domEl = document.documentElement.nodeName;
  if (domEl) {
    return domEl.toLowerCase() === 'html';
  }
  return true;
}

async function domIsReady() {
  // console.log('domIsReady>>>>>', document.readyState);
  if (['interactive', 'complete'].includes(document.readyState)) {
    return true;
  }

  return new Promise((resolve) => window.addEventListener('DOMContentLoaded', resolve, { once: true }));
}

function logStreamDisconnectWarning(remoteLabel, err) {
  let warning = `${extName} Contentscript - lost connection to ${remoteLabel}`;
  if (err) {
    warning += '\n' + err.stack;
  }
  console.warn(warning);
}
