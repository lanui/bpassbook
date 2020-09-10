import EventEmitter from 'events'

import extension from '@/lib/extensionizer'

import store from '@/store'

import {
  APITYPE_INIT_STATE,
  APITYPE_UPDATE_UNLOCKED,
  APITYPE_PWD_INCORRECT,
  APITYPE_REDIRECT_APP,
  APITYPE_LOGOUT,
} from '@/corejs/enums'

class ClientConnectionPort extends EventEmitter {
  constructor(opts) {
    super()

    this.portName = opts.portName

    const remotePort = extension.runtime.connect({ name: this.portName})
    this.remotePort = remotePort

    remotePort.onMessage.addListener( async (message) => {
      console.log("Client Rec data:" ,message)

      if(message && message.apiType ){
        const apiType = message.apiType

        switch (apiType) {
          case APITYPE_INIT_STATE :
            updateVuex(message.data)
            break;
          case APITYPE_PWD_INCORRECT:
            //message : apiType, error.message error.code
            console.log('error',message.error.message)
            store.dispatch('setLoginError', message.error.message)
            break;
          case APITYPE_UPDATE_UNLOCKED:

            break;
          case APITYPE_LOGOUT:

            break;
          default:
            break;
        }
      }


      function updateVuex(payload) {
        store.dispatch('updateFromBackground', payload)
      }
    })

  }

  getRemotePort(){
    return this.remotePort
  }

  sendUnlockedReq(password,env3){
    const remotePort = this.remotePort
    console.log("clientPort>>",this)
    remotePort.postMessage({ apiType: APITYPE_UPDATE_UNLOCKED,data:{password,env3}})
    console.log("Cli Send unlock env3>>>", remotePort,env3,password)
  }

}

function initState(data) {

}

export default ClientConnectionPort
