import EventEmitter from 'events';
import ObservableStore from 'obs-store';

const $ = require('jquery');

import {
  ICON_WRAPPER_ID,
  getElPosition,
  createBPIcon,
  removeIcon,
  calcIconFloatLeft,
  calcIconFloatTop,
  initBPIconWrapper,
} from './ui-helper';

import { WEB_PAGE_MSG, GET_IS_UNLOCKED } from './api-cnst';

const initState = {
  type: 'username',
  id: ICON_WRAPPER_ID,
};

/**
 *
 */
export class NameController extends EventEmitter {
  constructor(opts = {}) {
    super();

    const _base = checkNameElementExists();
    if (_base) {
      this.enabled = true;
      const position = getElPosition(_base.$target);
      this.store = new ObservableStore(Object.assign({ isUnlocked: false }, initState, _base, { position: position }));

      // Bind
      handleStateChanged.bind(this);
      originBindEvent.bind(this);

      this.store.subscribe(handleStateChanged);

      this.bindEvents();
    } else {
      this.enabled = false;
      this.store = new ObservableStore(Object.assign({}));
    }
  }

  getState() {
    return this.store.getState();
  }

  getOrigin() {
    return this.store.getState()?.$target;
  }

  updatePosition(position) {
    if (typeof position === 'object') {
      this.store.updateState({ position: position });
    }
  }

  createIcon() {}

  bindEvents() {
    originBindEvent.bind(this);
    originBindEvent(this.store);
  }
}

function originBindEvent(store) {
  console.log('name Controller >>originBindEvent>>>>>>>>>>', this, store);
  const opts = store.getState();
  const { $target, id } = opts;
  $($target).on('focusin', function (e) {
    console.log('Create Icons >>>>', this.getClientRects(), opts);
    createBPIcon(this);
  });
  $($target).on('focusout', function (e) {
    console.log('remove Icons >>>>');
    removeIcon(id);
  });
}

function handleStateChanged(value) {
  const { id } = value;
  const left = calcIconFloatLeft(value.position);
  const top = calcIconFloatTop(value.position);

  if ($(`#${id}`)[0]) {
    //console.log(">>>>>",`${left}- ${top}`)
    $(`#${id}`).css({ left: left + 'px', top: top + 'px' });
  }
}

function checkNameElementExists() {
  const { document } = window;
  let targetSelector;
  let $target;

  if ($('#username')[0]) {
    targetSelector = '#username';
    $target = $('#username')[0];
  } else if ($('input[name="username"][type="text"]')[0]) {
    targetSelector = 'input[name="username"][type="text"]';
    $target = $('input[name="username"][type="text"]')[0];
  } else if ($('input[name="email"][type="text"]')[0]) {
    targetSelector = 'input[name="email"][type="text"]';
    $target = $('input[name="email"][type="text"]')[0];
  }

  if (!$target) return false;
  return {
    targetSelector,
    $target,
  };
}

function postIsUnlockedReq() {
  window.postMessage(
    {
      type: WEB_PAGE_MSG,
      text: GET_IS_UNLOCKED,
    },
    '*'
  );
}

export default NameController;
