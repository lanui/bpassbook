const $ = require('jquery');

export const ICON_WRAPPER_ID = '__icon_name_Wrapper';
export const Z_INDEX = 2247483646;
export const Ext_GID = 'chrome-extension://beobdgahalpbmiohplgchnjjhppfmmnp/inputor/inputor.html';

const LOG_PREFFIX = 'BP-ui-helper';
export const iconSrcBase64 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADeklEQVQ4jT2UT2hcVRTGf+fe92ZeMmlmkrQmqdbSZGNFsMVFsfgHkirdFNqi+IcqQqWgCNUiWkELDd3oQoroRtyouHAVAtZWTJONSEqhYqFILVECKm3CpEknM5k/794j900mD967cM893/vOd7575JG3qlgcScSoUf+eOHfAqA7EQmpQLMrmqoqgkYVyBNNWzCeKzgPIoydriHcHjU8nDZrkI1hcdlQq7eQIvwEEQ33Ctl4hTT1WfdirR8YesdZeiiRvd/lq66JHyFvhn2XH3pGYF5/O0xULzilJDMv3PN9eqPJv2THcb/Au8NAE7y7m49xI1Ki3JhTIibBU8QwPWL7/sEitriytepJYqDc8Dwxantqb55WPyqzWPD15E4BQdaw3mxOR94wFFZwoKzU4sCcmF8GTH6xw4++U4ZJwZ8mxe6flypdb2b8nz9Rsje7BULBijcGhY6YpFDCCV0GssNYI/KCvZCkWLU4MlTq8/UJPIMDsb80s5hB89hpSKBjFuLDpRHCZrJIBzd9W7lbh/gHDG0e7eWk84bkzKywsenp6AgsyoDagcZFDVMKvBNLwMcLymnJoX45Th/MZkLSxKRUNXoRaU4glMN8IoGo8dFDxAvfqGRafvt7FHwuOC1da2dEf5hp89W4vJw53c+s/h1iT5XWYGbdBzymYSFisKKWCMHU15dl31tj/sOX8VJ1Dx1f4+VqLidd6GNkRs1TRzdJcG2iDkQiNlrB9wGQMjn+2ztcTW+gtGE5/U6e0O8fZ72pZbPyxHLdXFZWO4BB5JJMgKzEVCkm77l/OFXhop2HsTI0gUrEorK63FSnkhZaGBpEpHA6YFGM7OoWE1LeB7tTgmXPrzP7uGNpqWfjTc/SJfBb79aaj0G2y5mi7ScFOVJvaphiUC/qE58QXDaZnHDu2G3wT3jyWcPblhJ+utZi+njLYbzPvNbMbK9XIW5lxKceC2FHBMHdLUQ83P+/KDJg1eaPLk3Mpr56vsa3PZExcMLEXfGxmZPC07lqrur/CiAhX4+6y4/FRw/P7JLu0waJrTeXydcePV1vctwWGioJLfTZWIpSkkIxI6ZSSej2o3k8ar0kAK5c9VH1QsuM3oi7lwX7Ih075TZB6bOSINXJJuk8qIhqcOupV38cxbvEDVkjDPOoMtpAYjGHQKFItW8Pl2MjHUermwfM/dYqWYnjQ/J0AAAAASUVORK5CYII=';
const ICON_SIZES = {
  large: 22,
  medium: 18,
  small: 16,
};

const FRAME_BOX = {
  width: 260,
  minHeight: 180,
};

export const ICON_CLASS_NAME = 'bp-img--wrapper';
const ICON_WRAP_TAG = 'bp-extension-button';
const OPTIONS_WRAP_TAG = 'bp-selector-options';
const BP_IFRAME_MENU_ID = '__bp_iframe_menu';

const SELECT_CONST = {
  width: '120',
  minHeight: '80',
  lockId: '__BP_Selector_Wrapper_Lock',
  unlockId: '__BP_Selector_Wrapper_Unlock',
};

const ICON_WRAPPER_MARGIN = {
  x: 2,
  y: 0,
};

export const getIconSize = (height) => {
  if (!height) return ICON_SIZES.small;

  if (height > 32) return ICON_SIZES.large;
  if (height > 22 && height < 32) return ICON_SIZES.medium;
  return ICON_SIZES.small;
};

export function createBPIcon(el) {
  if (!el) return;
  // console.log('BPInjetTop>>>>>', window);
  const _win = window;
  const { document } = _win;
  removeIcon();

  const wrapper = window.document.createElement(ICON_WRAP_TAG);

  const position = getElPosition(el);
  const fLeft = calcIconFloatLeft(position);
  const fTop = calcIconFloatTop(position);
  // console.log('createBPIcon>>>', position);

  const { iconSize } = position;
  const id = ICON_WRAPPER_ID;

  const img = document.createElement('img');
  img.setAttribute('width', iconSize);
  img.setAttribute('height', iconSize);
  img.src = iconSrcBase64;
  img.className = ICON_CLASS_NAME;
  img.style.cssText =
    `position:fixed;float:initial;left:${fLeft}px;top:${fTop}px;` +
    `margin: ${ICON_WRAPPER_MARGIN.x}px ${ICON_WRAPPER_MARGIN.y}px;z-index:${Z_INDEX}`;

  wrapper.appendChild(img);

  //$(wrapper).appendTo($('body'));
  window.document.body.appendChild(wrapper);

  img.addEventListener('click', (e) => {
    e.stopPropagation();
    removeIcon();
  });

  createIFrame(position);
}

/**
 *
 * @param {*} position
 */
export function createIFrame(position) {
  const extIframe = window.document.querySelectorAll(OPTIONS_WRAP_TAG);
  if (extIframe && extIframe.length) {
    window.document.querySelector(OPTIONS_WRAP_TAG).remove();
  }
  const optionsWrap = window.document.createElement(OPTIONS_WRAP_TAG);

  const iframe = window.document.createElement('iframe');
  iframe.setAttribute('id', BP_IFRAME_MENU_ID);
  iframe.setAttribute('src', Ext_GID);
  const fTop = calcBoxFloatTop(position);
  const fLeft = calcBoxFloatLeft(position);
  iframe.style.cssText =
    `position:fixed;float:initial;left:${fLeft}px;top:${fTop}px;` +
    `width:${FRAME_BOX.width}px;min-height:${FRAME_BOX.minHeight}px;` +
    'box-shadow:none;' +
    'border-radius: 0px;border: solid 0px rgba(0,0,0,0);' +
    `z-index:${Z_INDEX}`;
  $(iframe).appendTo($(optionsWrap));

  window.document.body.appendChild(optionsWrap);
}

/**
 *
 */
export function removeIcon() {
  if (window.document.querySelector(`${ICON_WRAP_TAG}`)) {
    window.document.querySelector(`${ICON_WRAP_TAG}`).remove();
  }

  if (window.document.querySelector(OPTIONS_WRAP_TAG)) {
    window.document.querySelector(OPTIONS_WRAP_TAG).remove();
  }
}

export function calcBoxFloatLeft(position) {
  const { offsetWidth, clientWidth, left, width } = position;
  return left - (FRAME_BOX.width - (width || clientWidth || offsetWidth)) + 4;
}

export function calcBoxFloatTop(position) {
  const { height, offsetHeight, clientHeight, iconSize, y } = position;
  return y + offsetHeight + 2;
}

export function calcIconFloatLeft(position) {
  const { offsetWidth, clientWidth, x, width, iconSize } = position;
  return x + (width - iconSize - ICON_WRAPPER_MARGIN.x * 2) - (offsetWidth - clientWidth);
}

export function calcIconFloatTop(position) {
  const { height, offsetHeight, clientHeight, iconSize, y } = position;

  //return top + (offsetHeight - iconSize)/2;
  return y + (height - iconSize) / 2 - (offsetHeight - clientHeight) / 2;
}

export function createSelectLockBox(opts, list, isUnlocked) {
  const id = isUnlocked ? SELECT_CONST.unlockId : SELECT_CONST.lockId;
  const divBox = document.createElement('div');
  divBox.setAttribute('id', id);

  $(divBox).appendTo($('body'));
}

/**
 *
 * @param {*} $target
 */
export function getElPosition($target) {
  if (!$target && $target.getClientRects()[0]) return false;
  const rects = $target.getClientRects();
  // console.log(`${LOG_PREFFIX}-rects>>>> `, $target, $target.getClientRects());
  const iconSize = getIconSize(rects[0]?.height || $target.offsetHeight || $target.clientHeight);

  return {
    x: rects[0]?.x || 0,
    y: rects[0]?.y || 0,
    height: rects[0]?.height || 0,
    width: rects[0]?.width || 0,
    top: rects[0]?.top || 0,
    right: rects[0]?.right || 0,
    left: rects[0]?.left || 0,
    bottom: rects[0]?.bottom || 0,
    offsetWidth: $target.offsetWidth,
    offsetHeight: $target.offsetHeight,
    clientHeight: $target.clientHeight,
    clientWidth: $target.clientWidth,
    iconSize,
  };
}

/**
 *
 * @param {*} position
 */
export function updateIconPosition(position) {
  if (!position) return;

  const img = window.document.querySelector(`${ICON_WRAP_TAG}>img`);
  if (img) {
    img.style.top = calcIconFloatTop(position) + 'px';
    img.style.left = calcIconFloatLeft(position) + 'px';
  }
}

export function updateIFramePosition(position) {
  if (!position) return;
  const extIframe = window.document.querySelector(`${OPTIONS_WRAP_TAG}>iframe`);

  if (extIframe) {
    extIframe.style.top = calcBoxFloatTop(position) + 'px';
    extIframe.style.left = calcBoxFloatLeft(position) + 'px';
  }
}

/**
 * only once
 */
export function initBPIconWrapper() {
  const { document } = window;
  const wrapper = document.createElement(ICON_WRAP_TAG);
  $(wrapper).appendTo($('body'));
}

export function buildPasswordSelector(el) {
  const id = el.id === undefined || el.id === '' ? '' : `#${el.id}`;

  let clz = '';
  const className = el.className;
  if (className && className.trim().split(/\s+/).length > 0) {
    clz = '.' + className.trim().split(/\s+/).join('.');
  }

  return `input[type="password"]${id}${clz}`;
}

export function buildUserNameSelector(el) {
  const id = el.id === undefined || el.id === '' ? '' : `#${el.id}`;

  let clz = '';
  const className = el.className;
  if (className && className.trim().split(/\s+/).length > 0) {
    clz = '.' + className.trim().split(/\s+/).join('.');
  }

  return `input[type="text"]${id}${clz}`;
}
