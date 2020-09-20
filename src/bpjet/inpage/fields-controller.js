import EventEmitter from 'events';
import ObservableStore from 'obs-store';

const $ = require('jquery');

const LOG_PREFFIX = 'BP-controller';

import {
  ICON_WRAPPER_ID,
  getElPosition,
  createBPIcon,
  removeIcon,
  updateIconPosition,
  updateIFramePosition,
  buildPasswordSelector,
  buildUserNameSelector,
} from './ui-helper';

import { WEB_PAGE_MSG, GET_IS_UNLOCKED } from './api-cnst';

const initState = {
  type: 'username',
  id: ICON_WRAPPER_ID,
};

/**
 *
 */
export class FieldsController extends EventEmitter {
  constructor(opts = {}) {
    super();
    const { initState } = opts;
    const checkState = checkFormFields();
    this.hasLoginForm = checkState.hasLoginForm;
    const { targetUserName, targetPassword, currentTarget, position, usernameSelector, passwordSelector } = checkState;

    this.targetUserName = targetUserName;
    this.targetPassword = targetPassword;
    this.currentTarget = currentTarget;
    this.usernameSelector = usernameSelector;
    this.passwordSelector = passwordSelector;

    this.store = new ObservableStore(
      Object.assign({}, { targetUserName, targetPassword, currentTarget, position }, { isUnlocked: false }, initState)
    );
    console.log('BPinjet>>>>', this.store.getState());

    //dom resize
    handleStateChanged.bind(this);

    //bind target event

    this.store.subscribe(handleStateChanged);

    this._initTargetBindEvents();
  }

  getState() {
    return this.store.getState();
  }

  updatePosition(position) {
    if (typeof position === 'object') {
      this.store.updateState({ position: position });
    }
  }

  fillInputField(data) {
    const { username, password } = data;

    if (this.targetUserName) {
      this.targetUserName.value = username;
    }
    if (this.targetPassword) {
      this.targetPassword.value = password;
    }

    this.removeBPIcon();
  }

  removeBPIcon() {
    removeIcon();
  }

  _initTargetBindEvents() {
    console.log('BPinjet>>>this bind>', this);
    const targetPassword = this.targetPassword;
    const targetUserName = this.targetUserName;
    const _ctx = this;

    if (targetPassword) {
      $(targetPassword).on('focusin', function (e) {
        e.stopPropagation();
        console.log('BPinjet>>> focusin', e, e.target);
        createBPIcon(this);
        _ctx.currentTarget = e.target;
        $(e.target).on('click', function (e) {
          e.stopPropagation();
        });
      });
      $(targetPassword).on('focusout', function (e) {
        $(e.target).off('click');
      });

      if (targetUserName) {
        $(targetUserName).on('focusin', function (e) {
          e.stopPropagation();
          console.log('BPinjet>>> focusin', e, e.target);
          createBPIcon(this);
          _ctx.currentTarget = e.target;
          $(e.target).on('click', function (e) {
            e.stopPropagation();
          });
        });

        $(targetUserName).on('focusout', function (e) {
          $(e.target).off('click');
        });
      }
      // remove icon
      $(window.document).on('click', function (e) {
        e.stopPropagation();
        removeIcon();
      });
      if (window.self !== window.top) {
        $(window.parent.document).on('click', function (e) {
          e.stopPropagation();
          console.log('BPinjet>remove');
          removeIcon();
        });
      }
    }
  }
}

/**
 *
 * @param {*} state
 */
function handleStateChanged(state) {
  updateIconPosition(state.position);
  updateIFramePosition(state.position);
}

const PASSWORD_SELECTOR = 'input[type="password"]';
const USERNAME_SELECTOR = 'input[type="text"]';

function checkFormFields() {
  let targetPassword = null,
    targetUserName = null,
    iframe = null,
    hasLoginForm = false,
    currentTarget = null,
    position = null,
    usernameSelector = null,
    passwordSelector = null;

  targetPassword = window.document.querySelector(PASSWORD_SELECTOR);
  targetUserName = window.document.querySelector(USERNAME_SELECTOR);

  if (targetPassword) {
    passwordSelector = buildPasswordSelector(targetPassword);
  }

  if (targetUserName) {
    usernameSelector = buildUserNameSelector(targetUserName);
  }

  hasLoginForm = Boolean(targetPassword);

  if (hasLoginForm) {
    currentTarget = targetUserName || targetPassword;
    position = getElPosition(currentTarget);
  }

  console.log(`${LOG_PREFFIX} >>> targetPassword`, passwordSelector, '<<>>', usernameSelector);
  return {
    usernameSelector,
    passwordSelector,
    currentTarget,
    hasLoginForm,
    position,
    targetPassword,
    targetUserName,
  };
}

export default FieldsController;
