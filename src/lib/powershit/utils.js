/**
 *
 * @param {*} address
 */
export function validAddress(address) {
  if (address == undefined) return false;
  return /^(0x)?[0-9a-f]{40}$/i.test('' + address);
}
