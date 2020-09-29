function aesEncrypt(key, plainTxt) {
  var iv = getRandomBuffer(16);
  var aesCfb = new aesjs.ModeOfOperation.cfb(key, iv, 16);
  var encryptedBytes = aesCfb.encrypt(plainTxt);
  return appendBuffer(iv, encryptedBytes);
}

function ed25519ToCurve25519(secretKey) {
  return ed2curve.convertSecretKey(secretKey);
}

/**
 *
 * @param {*} password
 */
function GenerateWallet(password) {
  // create eth account
  var params = { keyBytes: 32, ivBytes: 16 };
  var edk = keythereum.create(params);
  var options = {
    kdf: 'scrypt',
    cipher: 'aes-128-ctr',
    kdfparams: {
      n: 262144,
      dklen: 32,
      prf: 'hmac-sha256',
    },
  };
  var keyObject = keythereum.dump(password, edk.privateKey, edk.salt, edk.iv, options);
  //create ed25519 keypair
  var ed25519KeyPair = nacl.sign.keyPair();
  //derive aes key
  var determinsticSalt = ed25519KeyPair.publicKey.slice(0, 8);
  var pass = Buffer.from(password);
  var dk = keythereum.deriveKey(Buffer.from(pass), determinsticSalt, { kdf: 'scrypt', kdfparams: { n: 32768 } });
  //encrypt ed25519 priKey
  var cipher = aesEncrypt(dk, ed25519KeyPair.secretKey);
  //base58 encode
  var base58Cipher = bs58.encode(cipher);
  //output wallet
  var subAddr = 'BP' + bs58.encode(ed25519KeyPair.publicKey);
  var pWallet = {
    version: 1,
    mainAddress: '0x' + keyObject.address,
    crypto: keyObject.crypto,
    subAddress: subAddr,
    subCipher: base58Cipher,
  };

  return pWallet;
}

function openWallet(pWallet, password) {
  //open keystore
  var keyObject = { crypto: pWallet.crypto };
  var privateKey = keythereum.recover(password, keyObject);
  //recover publicKey
  var ed25519PublicKey = bs58.decode(pWallet.subAddress.slice(2));
  //derive aes key
  var determinsticSalt = ed25519PublicKey.slice(0, 8);
  var pass = Buffer.from(password);
  var dk = keythereum.deriveKey(Buffer.from(pass), determinsticSalt, { kdf: 'scrypt', kdfparams: { n: 32768 } });
  //decrypt sub privateKey
  var cipher = bs58.decode(pWallet.subCipher);
  var iv = cipher.slice(0, 16);
  var aesCfb = new aesjs.ModeOfOperation.cfb(dk, iv, 16);
  var subPriKey = aesCfb.decrypt(cipher.slice(16));
  return { MainPriKey: privateKey, SubPriKey: subPriKey };
}

//-------------------some utils-----------------------------
function appendBuffer(A, B) {
  var r = [];
  for (var i = 0; i < A.length; i++) {
    r.push(A[i]);
  }
  for (var j = 0; j < B.length; j++) {
    r.push(B[j]);
  }
  return Buffer.from(r);
}

function splitBytesArray(bytes, delimiter) {
  array = [];
  if (bytes.length == 0) {
    return array;
  }

  var lastIndex = 0;
  for (var i = 0; i < bytes.length; i++) {
    if (bytes[i] == delimiter) {
      if (i == lastIndex) {
        continue;
      }
      array.push(bytes.slice(lastIndex, i));
      lastIndex = i + 1;
    }
  }
  if (lastIndex < bytes.length) {
    array.push(bytes.slice(lastIndex));
  }
  return array;
}

function getRandomBuffer(size) {
  var l = [];
  for (var i = 0; i < size; i++) {
    l.push(Math.floor(Math.random() * 256));
  }
  return Buffer.from(l);
}
