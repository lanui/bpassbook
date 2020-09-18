export function postMsgToPage(items) {
  window.postMessage({ target: 'bpjet', data: items }, '*');
}
