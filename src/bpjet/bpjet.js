// import './injet.css'

import ResizeObserver from 'resize-observer-polyfill';
import { debounce } from 'lodash';

// import ext from '@/lib/extensionizer';

import { getElPosition } from './inpage/ui-helper';
import { NameController } from './inpage/name-controller';

const $ = require('jquery');

injetStartup();
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
  console.log('sdfsd>>>>>>>>>>>>>>>', event);
}
