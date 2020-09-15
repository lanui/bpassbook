// import './injet.css'

import ext from '@/lib/extensionizer';
import iconSvg from '@/icons/icon_18.png';
import PostMessageDuplexStream from 'post-message-stream';

injetStartup();
function injetStartup() {
  global.BPassword = 'OKe';
  console.log('HHHHHHHH>>>>');

  window.addEventListener('DOMContentLoaded', domLoadedHandle);
}

function domLoadedHandle(event) {
  appendBPIcon();
  const injetStream = new PostMessageDuplexStream({
    name: 'injet',
    target: 'contentscript',
  });
}

function initProvider({
  connectionStream,
  maxEventListeners = 100,
  shouldSendMetadata = true,
  shouldSetOnWindow = true,
} = {}) {}

function appendBPIcon() {
  const body = document.body;
  const div = document.createElement('div');
  const button = document.createElement('button');
  button.setAttribute('id', 'bp-icon-button');
  const iconSvg = 'chrome-extension://beobdgahalpbmiohplgchnjjhppfmmnp/share/svg/icon_18.svg';
  button.style.cssText = getIconStyle();
  button.textContent = 'BP';
  div.appendChild(button);

  div.setAttribute('id', 'bp-icon-wrap');
  body.appendChild(div);
}

function getIconStyle() {
  const style =
    'animation: initial; transition: initial; color: initial;' +
    'color-scheme: initial; font: initial; font-feature-settings: initial; font-kerning: initial; font-optical-sizing: initial; font-variation-settings: initial; text-orientation: initial; text-rendering: initial; -webkit-font-smoothing: initial; -webkit-locale: initial; -webkit-text-orientation: initial; -webkit-writing-mode: initial; writing-mode: initial; zoom: initial; place-content: initial; place-items: initial; place-self: initial; alignment-baseline: initial; appearance: initial; backdrop-filter: initial; backface-visibility: initial;' +
    ' background: url("chrome-extension://beobdgahalpbmiohplgchnjjhppfmmnp/share/svg/icon_18.svg") 0% 0% / cover no-repeat; background-blend-mode: initial; baseline-shift: initial; block-size: initial; border-block-end: initial; border-block-start: initial; border: none; border-radius: initial; border-collapse: initial; border-inline-end: initial; border-inline-start: initial; bottom: initial; box-shadow: initial; box-sizing: initial; break-after: initial; break-before: initial; break-inside: initial; buffered-rendering: initial; ' +
    'caption-side: initial; caret-color: initial; clear: initial; clip: initial; clip-path: initial; ' +
    'clip-rule: initial; color-interpolation: initial; color-interpolation-filters: initial; color-rendering: initial; columns: initial; column-fill: initial; gap: initial; column-rule: initial; column-span: initial; contain: initial; contain-intrinsic-size: initial; content: initial; content-visibility: initial; counter-increment: initial; counter-reset: initial; counter-set: initial; cursor: pointer; cx: initial; cy: initial; d: initial; display: initial; dominant-baseline: initial; empty-cells: initial;' +
    ' fill: initial; fill-opacity: initial; fill-rule: initial; filter: initial; flex: initial; flex-flow: initial; float: initial; flood-color: initial;' +
    ' flood-opacity: initial; grid: initial; grid-area: initial; height: 16px; hyphens: initial;' +
    ' image-orientation: initial; image-rendering: initial; inline-size: initial; ' +
    'isolation: initial; left: 448px; letter-spacing: initial; lighting-color: initial; line-break: initial; list-style: initial; margin-block-end: initial; margin-block-start: initial; margin: initial; margin-inline-end: initial; margin-inline-start: initial; marker: initial; mask: initial; mask-type: initial; max-block-size: initial; max-height: 24px; max-inline-size: initial; max-width: 24px; min-block-size: initial; min-height: 12px; min-inline-size: initial; min-width: 12px; mix-blend-mode: initial; object-fit: initial; object-position: initial; offset: initial; opacity: initial; order: initial; origin-trial-test-property: initial; orphans: initial; outline: 0px; outline-offset: initial; overflow-anchor: initial; overflow-wrap: initial; overflow: initial; overscroll-behavior-block: initial; overscroll-behavior-inline: initial; overscroll-behavior: initial; padding-block-end: initial; padding-block-start: initial; padding: initial; padding-inline-end: initial; padding-inline-start: initial; page: initial; page-orientation: initial; paint-order: initial; perspective: initial; perspective-origin: initial; pointer-events: initial; position: fixed; quotes: initial; r: initial; resize: initial; right: initial; ruby-position: initial; rx: initial; ry: initial; scroll-behavior: initial; scroll-margin-block: initial; scroll-margin: initial; scroll-margin-inline: initial; scroll-padding-block: initial; scroll-padding: initial; scroll-padding-inline: initial; scroll-snap-align: initial; scroll-snap-stop: initial; scroll-snap-type: initial; shape-image-threshold: initial; shape-margin: initial; shape-outside: initial; shape-rendering: initial; size: initial; speak: initial; stop-color: initial; stop-opacity: initial; stroke: initial; stroke-dasharray: initial; stroke-dashoffset: initial; stroke-linecap: initial; stroke-linejoin: initial; stroke-miterlimit: initial; stroke-opacity: initial; stroke-width: initial; tab-size: initial; table-layout: initial; text-align: initial; text-align-last: initial; text-anchor: initial; text-combine-upright: initial; text-decoration: initial; text-decoration-skip-ink: initial; text-indent: initial; text-overflow: initial; text-shadow: initial; text-size-adjust: initial; text-transform: initial; text-underline-position: initial; top: 94px; touch-action: initial; transform: initial; transform-box: initial; transform-origin: initial; transform-style: initial; user-select: initial; vector-effect: initial; vertical-align: initial; visibility: initial; -webkit-app-region: initial; border-spacing: initial; -webkit-border-image: initial; -webkit-box-align: initial; -webkit-box-decoration-break: initial; -webkit-box-direction: initial; -webkit-box-flex: initial; -webkit-box-ordinal-group: initial; -webkit-box-orient: initial; -webkit-box-pack: initial; -webkit-box-reflect: initial; -webkit-font-size-delta: initial; -webkit-highlight: initial; -webkit-hyphenate-character: initial; -webkit-line-break: initial; -webkit-line-clamp: initial; -webkit-mask-box-image: initial; -webkit-mask: initial; -webkit-mask-composite: initial; -webkit-perspective-origin-x: initial; -webkit-perspective-origin-y: initial; -webkit-print-color-adjust: initial; -webkit-rtl-ordering: initial; -webkit-ruby-position: initial; -webkit-tap-highlight-color: initial; -webkit-text-combine: initial; -webkit-text-decorations-in-effect: initial; -webkit-text-emphasis: initial; -webkit-text-emphasis-position: initial; -webkit-text-fill-color: initial; -webkit-text-security: initial; -webkit-text-stroke: initial; -webkit-transform-origin-x: initial; -webkit-transform-origin-y: initial; -webkit-transform-origin-z: initial; -webkit-user-drag: initial; -webkit-user-modify: initial; white-space: initial; widows: initial; width: 16px; will-change: initial; word-break: initial; word-spacing: initial; x: initial; y: initial; z-index: 2147483648;';
  return style;
}
