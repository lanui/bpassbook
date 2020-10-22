import EventEmitter from 'events';
import ObservableStore from 'obs-store';
import { debounce } from 'lodash';

const $ = require('jquery');

import { APITYPE_FETCH_MATCH_ITEMS } from '@/lib/cnst/api-cnst';

import {
  ICON_WRAPPER_ID,
  getElPosition,
  createBPIcon,
  removeIcon,
  updateIconPosition,
  updateIFramePosition,
  buildPasswordSelector,
  buildUserNameSelector,
  exsitsSelectorIframe,
  updateIFrameHeight,
} from './ui-helper';

const LOG_PREFFIX = 'BP-field-controller';
export const PASSWORD_SELECTOR = 'input[type="password"][name],input[type="password"]';
export const USERNAME_SELECTOR = 'input[type="mail"],input[type="text"][name],input[type="text"]';
const MAIL_SELECTOR = 'input[type="mail"]';
const FAVICON_SELECTOR = '';

export const POSITION_CHANGED_EVENT = 'abs:position-changed';

export const FIELD_INPUTOR_EVENTNAME = 'loginel:input';

export const FORM_SUBMIT_EVENTNAME = 'loginform:submit';

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
    this.extid = initState.extid;
    this.url = initState.inputorURL;
    this.addorURL = initState.addorURL;

    // console.log('>>>>>>>>>>>initState.inputorURL>>>>>>>>>>>>', this.url);
    this.store = new ObservableStore(initState);
    this.hasLoginForm = false;

    //
    this.on('elChanged', this.listenerMutationObs);
  }

  /**
   * binding dom resize update positions
   * @param {object} document
   */
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

  /**
   * 检查login form
   * @param {object} document
   */
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
      if (hasLoginForm) {
        this.hostname = window.location.hostname;
      }

      this.store.updateState({ position, usernameSelector, passwordSelector });
      // Bind Target field event
      this._initTargetBindEvents();

      // subcribe store
      this.store.subscribe(handleStateChanged);
    } else {
    }
  }

  // bindingEventsAndSubcribeStateChanged(){
  //   // Bind Target field event
  //   this._initTargetBindEvents();

  //   // subcribe store
  //   this.store.subscribe(handleStateChanged);
  // }

  async fetchInitData() {}

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

  setIframeHeight(height) {
    updateIFrameHeight(height);
  }

  /**
   *
   * @param {*} tab
   */
  getInputFieldData(tab) {
    const { hostname, origin, href } = window.location;
    const formData = {
      hasLoginForm: this.hasLoginForm,
      username: '',
      password: '',
      hostname: this.hostname || hostname,
      origin: origin || href,
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

    if (tab) {
      formData.favIconUrl = tab.favIconUrl;
      formData.origin = formData.origin || tab.tabUrl;
      formData.hostname = formData.hostname || tab.tabHostname;
    }

    return formData;
  }

  setItems(items) {
    this.items = items;
  }

  /**
   * used for control pop inputor
   * @param {string} username
   * @param {string} password
   */
  isFieldValueMatch(username, password) {
    const _items = this.items;
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

  /**
   *
   */
  async _initTargetBindEvents() {
    const targetPassword = this.targetPassword;
    const targetUserName = this.targetUserName;
    const { usernameSelector, passwordSelector } = (await this.store.getState()) || {};

    const _ctx = this;
    const inputorURL = this.url;
    const addorURL = this.addorURL;

    let UsernameInputEvent = new CustomEvent(FIELD_INPUTOR_EVENTNAME, {
      bubbles: false,
      cancelable: true,
      detail: {
        ctx: this,
        sendValToInputor: () => {
          /**
           * 1. send value to inputor
           * 2. update this items
           * 3. check show Icon
           */

          const _curNameVal =
            targetUserName.value ||
            (usernameSelector && document.querySelector(usernameSelector)
              ? document.querySelector(usernameSelector).value
              : '');
          const _curPassVal =
            targetPassword.value ||
            (passwordSelector && document.querySelector(passwordSelector)
              ? document.querySelector(passwordSelector).value
              : '');
          const extIframe = exsitsSelectorIframe(inputorURL);

          chrome.runtime.sendMessage(
            _ctx.extid,
            { apiType: APITYPE_FETCH_MATCH_ITEMS, hostname: this.hostname },
            { includeTlsChannelId: true },
            async (resp) => {
              // return;

              const showPop = controlNameChanged(resp, _curNameVal, _curPassVal);
              // console.log('BPinjet>>> targetUserName>> changed>>', showPop, _curNameVal, _curPassVal, extIframe);
              if (showPop === 'addor') {
                createBPIcon(this.targetUserName, addorURL);
              } else if (showPop === 'remove') {
                removeIcon();
              } else if (showPop === 'selector') {
                //selector don't remove it,because remove cause connection disconnect and messages lost
                if (extIframe) {
                  //TODO send message to extension selector
                } else {
                  createBPIcon(this.targetUserName, inputorURL);
                }
              } else {
                removeIcon();
              }
            }
          );
          return this.targetUserName.value;
        },
      },
    });

    /**
     * password changed handle
     */
    let PasswordInputEvent = new CustomEvent(FIELD_INPUTOR_EVENTNAME, {
      bubbles: false,
      cancelable: true,
      detail: {
        ctx: this,
        sendValToInputor: () => {
          /**
           * 1. send value to inputor
           * 2. update this items
           * 3. check show Icon
           */
          const _curNameVal = this.targetUserName.value;
          const _curPassVal = this.targetPassword.value;

          const extIframe = exsitsSelectorIframe(inputorURL);

          chrome.runtime.sendMessage(
            _ctx.extid,
            { apiType: APITYPE_FETCH_MATCH_ITEMS, hostname: this.hostname },
            { includeTlsChannelId: true },
            async (resp) => {
              // return;

              const showPop = controlPasswordChanged(resp, _curNameVal, _curPassVal);
              // console.log('BPinjet>>> targetPassword>> changed>>', showPop, _curPassVal, _curNameVal, extIframe);
              if (showPop === 'addor') {
                createBPIcon(this.targetUserName, addorURL);
              } else if (showPop === 'remove') {
                removeIcon();
              } else if (showPop === 'selector') {
                //selector don't remove it,because remove cause connection disconnect and messages lost
                if (!extIframe) {
                  createBPIcon(this.targetUserName, inputorURL);
                } else {
                }
              } else {
                removeIcon();
              }
            }
          );
          return this.targetUserName.value;
        },
      },
    });

    /** Target Password Binding events */
    if (targetPassword) {
      if (targetPassword.form) {
        targetPassword.form.addEventListener('submit', (e) => {
          console.log('BPForm submit>>>>>>>>>>>>>>>>>>>>>>', e);
        });
      }

      $(targetPassword).on('focusin', function (e) {
        e.stopPropagation();
        _ctx.currentTarget = e.target;

        const _curNameVal = targetUserName ? targetUserName.value : '';
        const _curPassVal = targetPassword.value;
        const extIframe = exsitsSelectorIframe(inputorURL);

        chrome.runtime.sendMessage(
          _ctx.extid,
          { apiType: APITYPE_FETCH_MATCH_ITEMS, hostname: this.hostname },
          { includeTlsChannelId: true },
          async (resp) => {
            const showPop = controlPasswordPopup(resp, _curNameVal, _curPassVal);
            // console.log('BPinjet>>> targetPassword>> focusin>>', showPop, _curPassVal, _curNameVal, extIframe);

            if (showPop === 'addor') {
              createBPIcon(this, addorURL);
            } else if (showPop && showPop.startsWith('selector')) {
              if (!extIframe) {
                createBPIcon(this, inputorURL);
              }
            } else {
              removeIcon();
            }
          }
        );
        // createBPIcon(this, inputorURL);

        $(e.target).on('click', function (e) {
          e.stopPropagation();
        });
      });

      /** input changed  */
      targetPassword.addEventListener(PasswordInputEvent, (e) => e.detail.sendValToInputor());
      targetPassword.addEventListener('input', debounce(hanldePasswordInputEvent, 500));

      $(targetPassword).on('focusout', function (e) {
        $(e.target).off('click');
        //TODO remove events input and PasswordInputEvent
      });

      /** Target Username Binding events */
      if (targetUserName) {
        $(targetUserName).on('focusin', function (e) {
          e.stopPropagation();
          _ctx.currentTarget = e.target;
          const _curNameVal = targetUserName.value;
          const _curPassVal = targetPassword.value;

          chrome.runtime.sendMessage(
            _ctx.extid,
            { apiType: APITYPE_FETCH_MATCH_ITEMS, hostname: this.hostname },
            { includeTlsChannelId: true },
            async (resp) => {
              const showPop = controlNamePopup(resp, _curNameVal, _curPassVal);
              // console.log('BPinjet>>> targetUserName>> focusin>>', _curNameVal, _curPassVal, showPop);
              if (showPop === 'addor') {
                createBPIcon(this, addorURL);
              } else if (showPop && showPop.startsWith('selector')) {
                createBPIcon(this, inputorURL);
              } else if (showPop === 'remove') {
                //remove
                removeIcon();
              } else {
                //unhandle
              }
            }
          );

          $(e.target).on('click', function (e) {
            e.stopPropagation();
          });
        });

        /** input changed  */
        targetUserName.addEventListener(FIELD_INPUTOR_EVENTNAME, (e) => e.detail.sendValToInputor());
        targetUserName.addEventListener('input', debounce(hanldeNameInputEvent, 500));

        $(targetUserName).on('focusout', function (e) {
          $(e.target).off('click');
          //TODO remove events input and FIELD_INPUTOR_EVENTNAME
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

    function hanldeNameInputEvent(event) {
      event.target.dispatchEvent(UsernameInputEvent);
    }

    function hanldePasswordInputEvent(event) {
      event.target.dispatchEvent(PasswordInputEvent);
    }
  } //end _initTargetBindEvents

  // _bindingPositionChanged(){
  //   const controller = this
  //   windowResizeObserve(controller)
  //   windowScrollObserve(controller)
  // }
}

/**
 *
 * @param {object} resp backend response initState[data.items]
 * @param {*} nameValue
 */
function controlPasswordPopup(resp, nameValue, passValue) {
  let exactMatched = false; //精确匹配当前填写账号,不弹出添加
  let subMatchs = []; //部分匹配name
  let domainMatched = false;
  let _items = [];
  if (resp && resp.data) {
    _items = resp.data.items || [];
    domainMatched = Boolean(_items.length);
  }

  if (Boolean(nameValue)) {
    exactMatched = Boolean(_items.find((it) => it.username === nameValue && it.password === passValue));
    subMatchs = exactMatched ? false : _items.filter((it) => it.username.startsWith(nameValue));
  }

  if (exactMatched && !Boolean(passValue)) {
    // BPassword items matched input name value and password has value
    return false;
  }

  if (subMatchs && subMatchs.length > 0) {
    // BPassword items matched input name value multi items show selector
    // console.log('BPinjet>>> showPWDPop>>>>', subMatchs);
    return 'selector-subMatch';
  }

  if (domainMatched && !Boolean(nameValue)) {
    // BPassword domain has accounts ,and username no input value show selector
    return 'selector-domainMatch';
  }

  if (!domainMatched && Boolean(nameValue) && Boolean(passValue)) {
    // BPassword domain no accounts and username has input value show addor
    return 'addor';
  }

  return false;
}

/**
 *
 * @param {*} resp
 * @param {*} nameValue
 * @param {*} passValue
 */
function controlPasswordChanged(resp, nameValue, passValue) {
  /**
   * exactMatched : remove
   * subMatchs : selector
   * domainMatched : selector
   * no domainMatched && name && value : inputor
   * other : remove
   */
  let exactMatched = false; //精确匹配当前填写账号,不弹出添加
  let subMatchs = [];
  let domainMatched = false;
  let _items = [];
  if (resp && resp.data) {
    _items = resp.data.items || [];
    domainMatched = Boolean(_items.length);
  }

  if (Boolean(nameValue)) {
    exactMatched = Boolean(_items.find((it) => it.username === nameValue));
    subMatchs = exactMatched ? false : _items.filter((it) => it.username.startsWith(nameValue));
  }

  if (exactMatched) {
    return 'remove';
  }

  /**
   * 不干扰提交
   */
  if (subMatchs && !Boolean(passValue)) {
    return 'selector';
  }

  /**
   * 不干扰提交
   */
  if (domainMatched && !Boolean(nameValue)) {
    return 'selector';
  }

  if (!domainMatched && Boolean(nameValue) && Boolean(passValue)) {
    return 'addor';
  }

  return 'remove';
}

/**
 *
 * @param {*} resp
 * @param {*} nameValue
 * @param {*} passValue
 */
function controlNamePopup(resp, nameValue, passValue) {
  let exactMatched = false; //精确匹配当前填写账号,不弹出添加
  let subMatchs = [];
  let domainMatched = false;
  let _items = [];
  if (resp && resp.data) {
    _items = resp.data.items || [];
    domainMatched = Boolean(_items.length);
  }
  if (Boolean(nameValue)) {
    exactMatched = Boolean(_items.find((it) => it.username === nameValue && it.password === passValue));
    subMatchs = exactMatched ? false : _items.filter((it) => it.username.startsWith(nameValue));
  }

  if (exactMatched) {
    // BPassword items matched input name value and password has value
    return 'remove';
  }

  if (subMatchs && subMatchs.length > 0) {
    // BPassword items matched input name value and password has no value
    return 'selector-subMatch';
  }

  if (domainMatched && Boolean(nameValue)) {
    // BPassword domain has accounts ,and username no input value show selector
    return 'selector-domainMatch';
  }

  if (!domainMatched && Boolean(nameValue) && Boolean(passValue)) {
    // BPassword domain no accounts and username has input value show addor
    return 'addor';
  }

  return 'remove';
}

/**
 *
 * @param {*} resp
 * @param {*} nameValue
 * @param {*} passValue
 */
function controlNameChanged(resp, nameValue, passValue) {
  let exactMatched = false; //精确匹配当前填写账号,不弹出添加
  let subMatchs = [];
  let domainMatched = false;
  let _items = [];
  if (resp && resp.data) {
    _items = resp.data.items || [];
    domainMatched = Boolean(_items.length);
  }

  if (Boolean(nameValue)) {
    exactMatched = Boolean(_items.find((it) => it.username === nameValue && it.password === passValue));
    subMatchs = exactMatched ? false : _items.filter((it) => it.username.startsWith(nameValue));
  }

  if (exactMatched) {
    return 'remove';
  }
  // console.log('BPinjet>>> targetUserName>> subMatchs>>', subMatchs, _items);
  if (subMatchs && subMatchs.length > 0) {
    return 'selector';
  }

  if (domainMatched) {
    return 'selector';
  }

  if (!domainMatched && Boolean(nameValue) && Boolean(passValue)) {
    return 'addor';
  }

  return 'remove';
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
    loginForm = null,
    currentTarget = null,
    currentWidth = 0,
    position = null,
    usernameSelector = null,
    passwordSelector = null;

  origin = window.location.origin;

  let tmpName = null;
  let tmpPass = null;
  mutations.forEach((mutationRecord) => {
    const { addedNodes } = mutationRecord;
    //$nameFind[0].style.display !== 'none' handle baidu.com  垃圾baidu
    if (addedNodes.length > 0) {
      const $password = $(addedNodes[0]).find(PASSWORD_SELECTOR);
      // console.log('Check Login Form:checkFormFieldsForChanged mutationRecord in node &&& >>>>>>', addedNodes[0])
      if ($password[0] && !targetPassword) {
        targetPassword = $password[0];
      }
      if (!targetPassword) {
        targetPassword = document.querySelector(PASSWORD_SELECTOR);
        // console.log('Check Login Form:checkFormFieldsForChanged mutationRecord in node &&& >>>>>>', addedNodes[0])
      }
      const $nameFind = $(addedNodes[0]).find(USERNAME_SELECTOR);
      if ($nameFind[0] && !tmpName) {
        tmpName = $nameFind[0];
      }
    }
  });

  if (targetPassword) {
    passwordSelector = buildPasswordSelector(targetPassword);
    loginForm = passwordSelector.form || null;
    targetUserName = tmpName;
  }

  if (Boolean(loginForm)) {
    //has form
    targetUserName = loginForm.querySelector(USERNAME_SELECTOR);
  } else {
    if (!targetUserName && targetPassword) {
      //no form
      targetUserName = recursiveFindUsername(targetPassword);
    } else {
      targetUserName = getValidTarget(document.querySelectorAll(USERNAME_SELECTOR));
    }
  }

  if (targetUserName) {
    targetUserName.setAttribute('autocomplete', 'off');
    usernameSelector = buildUserNameSelector(targetUserName);
  }
  hasLoginForm = Boolean(targetPassword);
  if (hasLoginForm) {
    currentTarget = targetUserName || targetPassword;
    currentWidth = currentTarget.offsetWidth || 0;
    position = getElPosition(currentTarget) || {};
  }

  if (hasLoginForm) {
    // console.log('Check Login Form:checkFormFieldsForChanged >>>>>>', usernameSelector)
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
    loginForm = null,
    currentTarget = null,
    currentWidth = 0,
    position = null,
    usernameSelector = null,
    passwordSelector = null;

  origin = window.location.origin;
  // targetPassword = window.document.querySelector(PASSWORD_SELECTOR);

  targetPassword = getValidTarget(window.document.querySelectorAll(PASSWORD_SELECTOR));

  // console.log('Check Login Form:checkFormFields password >>>>>>', targetPassword)

  if (targetPassword) {
    loginForm = targetPassword.form || null;
    passwordSelector = buildPasswordSelector(targetPassword);
  }

  if (Boolean(loginForm)) {
    //has form
    targetUserName = loginForm.querySelector(USERNAME_SELECTOR);
    // console.log('Check Login Form:checkFormFields targetUserName in parent >>>>>>', targetUserName)
  } else {
    if (!targetUserName && targetPassword) {
      //no form
      targetUserName = recursiveFindUsername(targetPassword);
      // console.log('Check Login Form:checkFormFields targetUserName in dom >>>>>>', targetUserName)
    } else {
      targetUserName = getValidTarget(document.querySelectorAll(USERNAME_SELECTOR));
      // console.log('Check Login Form:checkFormFields password >>>>>>', targetUserName)
    }
  }

  if (targetUserName) {
    targetUserName.setAttribute('autocomplete', 'off');
    usernameSelector = buildUserNameSelector(targetUserName);
  }

  hasLoginForm = Boolean(targetPassword) && Boolean(targetUserName);

  if (hasLoginForm) {
    currentTarget = targetUserName || targetPassword;
    currentWidth = currentTarget.offsetWidth || 0;
    position = getElPosition(currentTarget) || {};
    // console.log(`${LOG_PREFFIX} >>chrome tabs>>`, chrome.runtime);
  }

  if (hasLoginForm) {
    // console.log('Check Login Form:checkFormFields >>>>>>', targetUserName, targetPassword);
  }

  return {
    usernameSelector,
    passwordSelector,
    currentTarget,
    currentWidth,
    hasLoginForm,
    loginForm,
    origin,
    position,
    targetPassword,
    targetUserName,
  };
}

/**
 * @deprecated
 * @param {*} controller
 */
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

/**
 * @deprecated
 * @param {} controller
 */
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

/**
 *
 * @param {*} nodelist
 */
function getValidTarget(nodelist) {
  let _target = null;
  nodelist.forEach((node) => {
    if (node.style.diplay !== 'none' && _target === null) {
      _target = node;
    }
  });
  return _target;
}

function recursiveFindUsername(targetPassword) {
  if (!targetPassword || !targetPassword.parentElement) {
    return null;
  }
  // console.log("&&&&***>>>>", targetPassword, targetPassword.parentElement)
  const _targetUname = targetPassword.parentElement.querySelector(USERNAME_SELECTOR);
  if (!_targetUname) {
    return recursiveFindUsername(targetPassword.parentElement);
  } else {
    // console.log("&&&&***>>>>find>>>", targetPassword, _targetUname)
    return _targetUname;
  }
}

export default FieldsController;
