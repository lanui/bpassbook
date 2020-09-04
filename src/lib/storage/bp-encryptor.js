import { utf8ToBuffer, Uint8Array, base64ToBuffer, bufferToUtf8, bufferToBase64 } from 'browserify-unibabel'

/**
 *
 * @param {*} password string
 * @param {*} dataObj
 */
export function encrypt(password, dataObj) {
  var salt = generateSalt()

  return keyFromPassword(password, salt)
  .then(function (pwdDerivedKey) {
    return encryptWithKey(pwdDerivedKey,dataObj)
  }).then(function (payload) {
    payload.salt = salt
    return JSON.stringify(payload)
  })
}

export function encryptWithKey(key, dataObj) {
  var data = JSON.stringify(dataObj)
  var dataBuffer = utf8ToBuffer(data)
  var vector = global.crypto.getRandomValues(new Uint8Array(16))

  return global.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: vector, },
    key,
    dataBuffer
  ).then(function (buf) {
    var buffer = new Uint8Array(buf)
    var vectorStr = bufferToBase64(vector)
    var vaultStr = bufferToBase64(buffer)

    return {
      data: vaultStr,
      iv: vectorStr,
    }
  })
}

/**
 *
 * @param {*} password
 * @param {*} text
 * @returns {*} JSON Object
 */
export function decrypt(password, text) {
  const payload = JSON.parse(text)
  const salt = payload.salt
  return keyFromPassword(password, salt).then(function (key) {
    return decryptWithKey(key, payload)
  })
}

function decryptWithKey(key, payload) {
  const encryptedData = base64ToBuffer(payload.data)
  const vector = base64ToBuffer(payload.iv)

  return crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: vector },
    key, encryptedData
  ).then(function (result) {
    const decryptedData = new Uint8Array(result)
    const decryptedStr = bufferToUtf8(decryptedData)
    const decryptedObj = JSON.parse(decryptedStr)

    return decryptedObj
  }).catch(function (reson) {
    throw new Error('Incorrect password.')
  })
}

function keyFromPassword(password, salt) {
  var passBuffer = utf8ToBuffer(password)
  var saltBuffer = base64ToBuffer(salt)

  return global.crypto.subtle.importKey(
    'raw',
    passBuffer,
    {
      name: 'PBKDF2'
    },
    false,
    ['deriveBits', 'deriveKey']
  ).then(function (key) {
    return global.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: saltBuffer,
        iterations: 10000,
        hash: 'SHA-256'
      },
      key,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    )
  })
}

/**
 * get string from storage transform buf
 * @param {*} str
 */
export function serializeBufferFromStorage(str) {
  let stripStr = (str.slice(0, 2) === '0x') ? str.slice(2) : str

  var buf = new Uint8Array(stripStr.length / 2)
  for (var i = 0; i < stripStr.length; i += 2) {
    let seg = stripStr.substr(i, 2)
    buf[i / 2] = parseInt(seg, 16)
  }

  return buf
}

/**
 * @returns a string
 * @param {*} buffer ready for storage,in hex format
 *
 */
export function serializeBufferForStorage(buffer) {
  let result = '0x'
  let len = buffer.length || buffer.byteLength
  for (var i = 0; i < len; i++) {
    result += unprefixedHex(buffer[i])
  }

  return result
}

export function generateSalt(byteCount = 32) {
  var view = new Uint8Array(byteCount)

  global.crypto.getRandomValues(view)
  var b64encoded = btoa(String.fromCharCode.apply(null, view))
  return b64encoded
}

function unprefixedHex(num) {
  let hex = num.toString(16)
  while (hex.length < 2) {
    hex = '0' + hex
  }

  return hex
}
