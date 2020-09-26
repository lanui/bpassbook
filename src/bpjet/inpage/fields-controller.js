import EventEmitter from 'events';
import ObservableStore from 'obs-store';
import { debounce } from 'lodash';

const $ = require('jquery');

const LOG_PREFFIX = 'BP-controller';
const PASSWORD_SELECTOR = 'input[type="password"]';
const USERNAME_SELECTOR = 'input[type="mail"],input[type="text"]';
const MAIL_SELECTOR = 'input[type="mail"]';
const FAVICON_SELECTOR = '';

export const POSITION_CHANGED_EVENT = 'abs:position-changed';

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

    this.on('elChanged', this.listenerMutationObs);
  }

  bindMutationObserver(document) {
    document = document || window.document;
    this.body = document.querySelector('body');
    const opts = {
      childList: true,
      attributes: false,
      subtree: true,
    };

    this.mutationObs = new MutationObserver(debounce(listenserMutations, 200));
    const constroller = this;

    // listenserMutations.bind(this)
    function listenserMutations(mutations, observer) {
      // console.log("Field-controller>>>mutations >>changed>>>>", observer)
      constroller.emit('elChanged', mutations);
    }

    this.mutationObs.observe(this.body, opts);
  }

  /**
   *
   * @param {*} mutations
   */
  listenerMutationObs(mutations) {
    if (mutations) {
      const checkedResultData = checkFormFieldsForChanged(mutations);
      const {
        usernameSelector,
        passwordSelector,
        currentTarget,
        hasLoginForm,
        origin,
        position,
        targetPassword,
        targetUserName,
      } = checkedResultData;

      this.hasLoginForm = hasLoginForm;
      this.origin = origin;
      this.targetUserName = targetUserName;
      this.targetPassword = targetPassword;
      this.currentTarget = currentTarget;

      this._initTargetBindEvents();

      this.store.updateState({ position, usernameSelector, passwordSelector });
      // subcribe store
      this.store.subscribe(handleStateChanged);

      // this._bindingPositionChanged()
    }
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

      // Bind Target field event
      this._initTargetBindEvents();

      // subcribe store
      this.store.subscribe(handleStateChanged);
    } else {
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
    const { hostname, origin } = window.location;
    const formData = {
      hasLoginForm: this.hasLoginForm,
      username: '',
      password: '',
      hostname: hostname,
      origin: origin,
    };

    if (this.targetPassword) {
      formData.password = this.targetPassword.value;
    } else {
      const tmpPwd = document.querySelector(PASSWORD_SELECTOR);
      if (tmpPwd) formData.hasLoginForm = true;
      formData.password = tmpPwd ? tmpPwd.value : '';
    }
    if (this.targetUserName) {
      formData.username = this.targetUserName.value;
    } else {
      const tmpName = document.querySelector(USERNAME_SELECTOR);
      formData.username = tmpName ? tmpName.value : '';
    }

    formData.origin = window.location.url;

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

  // _bindingPositionChanged(){
  //   const controller = this
  //   windowResizeObserve(controller)
  //   windowScrollObserve(controller)
  // }
}

/**
 *
 * @param {*} state
 */
function handleStateChanged(state) {
  // console.log(`${LOG_PREFFIX}- state>>>`, this, state);
  updateIconPosition(state.position);
  updateIFramePosition(state.position);
}

export function checkFormFieldsForChanged(mutations) {
  let targetPassword = null,
    targetUserName = null,
    origin = null,
    hasLoginForm = false,
    currentTarget = null,
    position = null,
    usernameSelector = null,
    passwordSelector = null;

  origin = window.location.origin;

  let tmpName = null;
  mutations.forEach((mutationRecord) => {
    const { addedNodes } = mutationRecord;
    if (addedNodes.length > 0) {
      const $nameFind = $(addedNodes[0]).find(USERNAME_SELECTOR);
      if ($nameFind[0]) {
        tmpName = $nameFind[0];
      }
      const $password = $(addedNodes[0]).find(PASSWORD_SELECTOR);
      if ($password[0]) {
        targetPassword = $password[0];
      }
    }
  });

  if (targetPassword) {
    passwordSelector = buildPasswordSelector(targetPassword);
    targetUserName = tmpName;
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

export default FieldsController;
