import CryptoJs from 'crypto-js';
import { validAddress } from './utils';

const Formatter = {
  stringify: function (cipherParams) {
    var jsonObj = { ciphertext: cipherParams.ciphertext.toString(CryptoJs.enc.Base64) };

    if (cipherParams.iv) {
      jsonObj.iv = cipherParams.iv;
    }
    if (cipherParams.salt) {
      jsonObj.salt = cipherParams.salt;
    }
    return jsonObj;
  },
  parse: function (jsonStr) {
    const jsonObj = JSON.parse(jsonStr);
    var cipherParams = CryptoJs.lib.CipherParams.create({
      ciphertext: CryptoJs.enc.Base64.parse(jsonObj.ciphertext),
    });

    if (jsonObj.iv) {
      cipherParams.iv = CryptoJs.enc.Hex.parse(jsonObj.iv);
    }

    if (jsonObj.salt) {
      cipherParams.salt = CryptoJs.enc.Hex.parse(jsonObj.salt);
    }

    return cipherParams;
  },
};

/**
 *
 * @param {*} words
 * @param {*} address
 */
export const encryptor = (words, address) => {
  if (words === undefined || typeof words === 'function') throw new Error(`Words undefined.`);
  if (!validAddress(address)) throw new Error(`Address illegal. ${address}`);
  const origin = splitAddress(address);

  let srcText = '';
  if (typeof words == 'string') {
    srcText = words;
  } else if (typeof words == 'object') {
    srcText = JSON.stringify(words);
  } else {
    srcText = '' + words;
  }
  // console.log('>>JSON encrypt before>>>', srcText)
  var encrypted = CryptoJs.AES.encrypt(srcText, origin.key, {
    iv: origin.iv,
    mode: CryptoJs.mode.CBC,
    padding: CryptoJs.pad.Pkcs7,
  });

  // console.log('>>JSON>>>', encrypted.toString())
  return encrypted.ciphertext.toString();
};

/**
 *
 * @param {*} cipher
 * @param {*} address
 */
export const decryptor = (cipher, address) => {
  if (typeof cipher !== 'string') throw new Error(`cipher illegal.${cipher}`);
  if (!validAddress(address)) throw new Error(`Address illegal. ${address}`);
  const origin = splitAddress(address);

  var encryptedHex = CryptoJs.enc.Hex.parse(cipher);

  var srcBase64 = CryptoJs.enc.Base64.stringify(encryptedHex);

  var bytes = CryptoJs.AES.decrypt(srcBase64, origin.key, {
    iv: origin.iv,
    mode: CryptoJs.mode.CBC,
    padding: CryptoJs.pad.Pkcs7,
    // format: Formatter,
  });

  var decrypted = bytes.toString(CryptoJs.enc.Utf8);

  return decrypted.toString();
};

function splitAddress(address) {
  const _origin = /^0x/i.test(address) ? address.substr(2) : address;
  const hex1 = _origin.substr(0, 16).toUpperCase();
  const hex2 = _origin.substr(_origin.length - 16).toUpperCase();
  return {
    key: CryptoJs.enc.Utf8.parse(hex1),
    iv: CryptoJs.enc.Utf8.parse(hex2),
  };
}
