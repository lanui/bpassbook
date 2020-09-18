// import './injet.css'

import ResizeObserver from 'resize-observer-polyfill';
import { debounce } from 'lodash';

// import ext from '@/lib/extensionizer';
import PostMessageDuplexStream from 'post-message-stream';

import { getElPosition } from './inpage/ui-helper';
import { NameController } from './inpage/name-controller';

import { CONN_CONTENTS_NAME, CONN_BPJET_NAME } from './contents';

const $ = require('jquery');

injetStartup();

const bpassbookStream = new PostMessageDuplexStream({
  name: CONN_CONTENTS_NAME,
  target: CONN_BPJET_NAME,
});

bpassbookStream.on('data', (data) => {
  console.log('BPjet Recv post-message-stream >>>', data);
});

function injetStartup() {
  window.addEventListener('message', handleMessage);
  window.addEventListener('DOMContentLoaded', domLoadedHandle);
}

function domLoadedHandle(event) {
  const nameCtx = new NameController();
  global.nameCtx = nameCtx;
  let DomSizeObs = new ResizeObserver(debounce(handleWindowResize, 100));

  if (nameCtx.enabled) {
    DomSizeObs.observe(document.body);
  } else {
    console.log('Webpage No login field....');
  }

  function handleWindowResize(entries, observer) {
    const { document } = window;

    const nameState = nameCtx.getState();
    console.log('Store get>>>', nameState, nameCtx.getOrigin());

    const namePosition = getElPosition(nameCtx.getOrigin());
    console.log('namePosition>>>', namePosition);
    nameCtx.updatePosition(namePosition);
  }
}

/**
 *
 */
function handleMessage(event) {
  const { origin, source, type, data } = event;
  console.log('bpjet RECV>>>>>>>>>>>>>>>', event);
  console.log('Recvi>>>>>>>>>', origin, 'source>>', source, 'type>>', type, 'data>>>', data);
}
