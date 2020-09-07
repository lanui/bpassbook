import EventEmitter from 'events'

import extension from '@/lib/extensionizer'
import { fromV3 } from 'ethereumjs-wallet'

import LocalStore from '@/lib/storage/local-store'
import endOfStream from 'end-of-stream'
import PortStream from 'extension-port-stream'

const passworder = require('browser-passworder')

import {
  APITYPE_INIT_STATE,
  APITYPE_UPDATE_UNLOCKED,
  APITYPE_PWD_INCORRECT,
  APITYPE_REDIRECT_APP,
} from '@/corejs/enums'

class ConnectionManager extends EventEmitter {

  constructor(opts) {
    super()
    const { portName, store } = opts

    this.portName = portName || 'popup'
  }

  async startup({ store = null, router = null }) {
    const remotePort = extension.runtime.connect({ name: this.portName })

    this.remotePort = remotePort
    this.store = store
    this.router = router

    remotePort.onMessage.addListener(async (message) => {
      const vueStore = global.bpvue.$store

      if (message && message.apiType && message.data) {
        switch (message.apiType) {
          case APITYPE_INIT_STATE:
            const { env3, isUnlocked, selectAddress } = message.data
            console.log("recive MSG>>", env3, isUnlocked, selectAddress)
            const data = message.data
            vueStore.commit('SET_ENV3', env3)
            break;
          case APITYPE_REDIRECT_APP :
            console.log("APITYPE_REDIRECT_APP>>>",message)
            bpvue.$router.push({path:'/initialize'})
            break;
          default:
            break;
        }
      }

    })
  }

  async updateAppStore(data) {
    const { env3 } = data
    const store = this.store

  }

  

  sendUpdateState(data = {}) {
    if (!this.remotePort) return ;
    // const portStream = new PortStream(remotePort)
    // endOfStream(portStream,()=>{
    //   console.log("send stream complete")
    // })
    this.remotePort.postMessage({ type: 'updateState', data })

  }

  sendUnlockedState(data={}){
    if ($conn.remotePort) {
      $conn.remotePort.postMessage({ type: APITYPE_UPDATE_UNLOCKED, data })
    }
  }

  async sendUnlocked(password,env3) {
    const remotePort = $conn.remotePort

    if (!env3) throw new Error('not initial')
    try {
      const text = JSON.stringify(env3)

      const v3 = await passworder.decrypt(password, text)

      const v3Wallet = await fromV3(v3, password)
      console.log("v3Wallet", text, v3Wallet, remotePort)
      const selectAddress = await v3Wallet.getChecksumAddressString()

      const payload = {
        env3,
        v3,
        wallet: selectAddress,
        unlocked: true
      }
      console.log(payload, this.remotePort)
      // notify backend
      remotePort.postMessage({ type: APITYPE_UPDATE_UNLOCKED, data: { unlocked: true, selectAddress } })

      return payload

    } catch (err) {
      throw err
    }

  }

  async unlockedV3({password, env3}) {
    try {
      const text = JSON.stringify(env3)
      const v3 = await passworder.decrypt(password, text)

      const v3Wallet = await fromV3(v3, password)
      console.log("v3Wallet", text, v3Wallet)
      const selectAddress = await v3Wallet.getChecksumAddressString()

      return {
        isUnlocked:true,
        selectAddress
      }

    }catch(error) {
      throw error
    }
  }

  _update() {

  }
}

export default ConnectionManager
