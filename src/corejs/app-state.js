
import ObservableStore from 'obs-store'
import EventEmitter from 'events'
import log from 'loglevel'
import { fromV3 } from 'ethereumjs-wallet'

const passworder = require('browser-passworder')

export default class AppStateController extends EventEmitter {
  constructor(opts = {}) {
    const {
      isUnlocked,
      initState,
      chainId,
    } = opts

    super()

    this.store = new ObservableStore(Object.assign({
      timeoutMinutes: 0,
      chainId:chainId||3
    }, initState))

    this.isUnlocked = Boolean(isUnlocked)

    this.timer = null

  }


  async unlock(password, env3) {
    try {
      console.log("123>>>>", password, env3)
      const text = JSON.stringify(env3)
      const v3 = await passworder.decrypt(password, text)

      const wallet = await fromV3(v3, password)
      if(wallet){
        this.wallet = wallet
        const selectAddress =  wallet.getChecksumAddressString();
        const privateKey =  wallet.getPrivateKeyString()
        const publicKey =  wallet.getPublicKeyString()

        this.store.updateState({ selectAddress, privateKey, publicKey})
      }

      // console.log(">>>>>>", v3)
      this.isUnlocked = true
      this.v3 = v3
      return v3
    } catch (err) {
      log.warn(err);
      return false
    }
  }

  async locked(){
    this.isUnlocked = false
  }

  setSelectAddress(){
    if(this.wallet){
      const addressHex = this.wallet.getChecksumAddressString()
      this.selectAddress = addressHex
    }
  }

  getAppState(){
    return {
      isUnlocked:this.isUnlocked,
      selectAddress : this.selectAddress ||""
    }
  }
}
