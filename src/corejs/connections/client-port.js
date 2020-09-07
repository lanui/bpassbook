import EventEmitter from 'events'

import extension from '@/lib/extensionizer'

import store from '@/store'

import {
  APITYPE_INIT_STATE,
  APITYPE_UPDATE_UNLOCKED,
  APITYPE_PWD_INCORRECT,
  APITYPE_REDIRECT_APP,
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
            console.log(">data>>>",message.data,store)
            store.dispatch('updateFromBackground', message.data)
            break;
          case APITYPE_PWD_INCORRECT:

            break;
          case APITYPE_UPDATE_UNLOCKED:

            break;
          default:
            break;
        }
      }

    })


  }

  updateInitStore(){

  }

  sendUnlockedReq(password,env3){
    const remotePort = this.remotePort
    remotePort.postMessage({ apiType: APITYPE_UPDATE_UNLOCKED,data:{password,env3}})
    console.log("env3>>>", remotePort,env3,password)
  }

}

function initState(data) {

}

export default ClientConnectionPort
