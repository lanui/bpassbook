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

const initState = {
  type: 'username',
  id: ICON_WRAPPER_ID,
};

/**
 * initState:
 *  extid,inputorURL,isUnlocked(noused)
 */
export class FieldsController extends EventEmitter {
  constructor(opts = {}) {
    super();
    const { initState } = opts;
    this.url = initState.inputorURL;
    console.log('>>>>>>>>>>>initState.inputorURL>>>>>>>>>>>>', this.url);
    this.store = new ObservableStore(initState);
    this.hasLoginForm = false;
  }

  checkedLoginForm(document) {
    const loginFormData = checkFormFields();
    if (loginFormData.hasLoginForm) {
      const {
        usernameSelector,
        passwordSelector,
        currentTarget,
        hasLoginForm,
        origin,
        position,
        targetPassword,
        targetUserName,
      } = loginFormData;

      this.hasLoginForm = hasLoginForm;
      this.origin = origin;
      this.targetUserName = targetUserName;
      this.targetPassword = targetPassword;
      this.currentTarget = currentTarget;

      this.store.updateState({ position, usernameSelector, passwordSelector });

      console.log(`${LOG_PREFFIX}- loginCtx>>>`, loginFormData, document);
      console.log(`${LOG_PREFFIX}- document>>>`, document);

      // Bind Target field event
      this._initTargetBindEvents();

      // subcribe store
      //handleStateChanged.bind(this);
      this.store.subscribe(handleStateChanged);
      // create
    } else {
      // console.log(`${LOG_PREFFIX}- No login form>>>`, chrome)
    }
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

  getInputFieldData() {
    const formData = {
      username: '',
      password: '',
      hostname: '',
      origin: '',
    };

    if (this.targetPassword) {
      formData.password = this.targetPassword.value;
    }
    if (this.targetUserName) {
      formData.username = this.targetUserName.value;
    }

    return formData;
  }

  removeBPIcon() {
    removeIcon();
  }

  _listenMessage() {
    // console.log(`${LOG_PREFFIX}-message started >>`, this.targetUserName)
    // window.onMessage.addListener(function (message, sender, sendResponse) {
    //   console.log(`${LOG_PREFFIX}-message listener>>>`, message)
    //   console.log(`${LOG_PREFFIX}-message sender>>>`, sender)
    //   console.log(`${LOG_PREFFIX}-message sendResponse>>>`, sendResponse({ resp: 'ok' }))
    //   console.log(`${LOG_PREFFIX}-message document>>>`, document.querySelector('#fm-login-id'))
    // })
  }

  _initTargetBindEvents() {
    const targetPassword = this.targetPassword;
    const targetUserName = this.targetUserName;
    const _ctx = this;
    const inputorURL = this.url;

    if (targetPassword) {
      $(targetPassword).on('focusin', function (e) {
        e.stopPropagation();
        // console.log('BPinjet>>> focusin', e, e.target);
        createBPIcon(this, inputorURL);
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
          // console.log('BPinjet>>> focusin', e, e.target);
          createBPIcon(this, inputorURL);
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
  console.log(`${LOG_PREFFIX}- state`, this, state);
  updateIconPosition(state.position);
  updateIFramePosition(state.position);
}

const PASSWORD_SELECTOR = 'input[type="password"]';
const USERNAME_SELECTOR = 'input[type="text"]';

export function checkFormFields() {
  let targetPassword = null,
    targetUserName = null,
    origin = null,
    hasLoginForm = false,
    currentTarget = null,
    position = null,
    usernameSelector = null,
    passwordSelector = null;

  origin = window.location.origin;
  targetPassword = window.document.querySelector(PASSWORD_SELECTOR);
  targetUserName = window.document.querySelector(USERNAME_SELECTOR);

  if (targetPassword) {
    passwordSelector = buildPasswordSelector(targetPassword);
  }

  if (targetUserName) {
    targetUserName.setAttribute('autocomplete', 'off');
    usernameSelector = buildUserNameSelector(targetUserName);
  }

  hasLoginForm = Boolean(targetPassword);

  if (hasLoginForm) {
    currentTarget = targetUserName || targetPassword;
    position = getElPosition(currentTarget) || {};
  }

  return {
    usernameSelector,
    passwordSelector,
    currentTarget,
    hasLoginForm,
    origin,
    position,
    targetPassword,
    targetUserName,
  };
}

export default FieldsController;
