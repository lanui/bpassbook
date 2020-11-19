# Dependencies

## end-of-stream

> when stream end to notify

## dnode

> a rpc api server with node

## Project P3 Extend

> String extend Base64

```javascript
''.fromBase64();
''.toBase64();
```

```json
{
  "version": 3,
  "id": "047b7751-629d-4571-9b32-28835d58f3cc",
  "address": "79f3ed68873e28ad7f72597b56326b2fc2fee26b",
  "crypto": {
    "ciphertext": "1884f6916508dd596c0f2ae35aXXXa1af717b750905e6e6",
    "cipherparams": { "iv": "915adb0cb55c3efXXXc4169e" },
    "cipher": "xxx-xxx-ctr",
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "salt": "1e0d9aae33df8XXXXX691e975b7ea04531a31",
      "n": 262144,
      "r": 8,
      "p": 1
    },
    "mac": "ec5e8db22e8aaXXXX206a573a30"
  }
}
```

title: www.baidu.com;username

### Chrome settings

> set privacy Chrome settings

> types [regular<incognito_persistent]

> api chrome.privacy.services.passwordSavingEnabled /autofillEnabled

> > get set details

```json
{
  "levelOfControl": "controllable_by_this_extension",
  "value": true
}
```

https://blog.csdn.net/hpp24/article/details/53389849

1. https://www.163.com 无法识别登录框 (2.0 版本修复)
2. 天猫 https://login.tmall.com/ 无法自动填写 (2.0 版本修复)
3. 百度 www.baidu.com 无法检测到登录框 ,js 后生成登录页(2.0 版本修复)
4. 腾讯 https://graph.qq.com/ 登录框太小导致 BPassword 显示不全(2.0 版本修复)
5. 小米商城 https://account.xiaomi.com/ 无法检测到用户名 (含有多个输入域) (2.0 版本修复)
