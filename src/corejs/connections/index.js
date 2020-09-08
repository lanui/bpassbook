import ClientConnectionPort from './client-port'
import { APITYPE_LOGOUT} from '@/corejs/enums'

class ConnectionManager {
  constructor(opts){
    const {portName,store} = opts
    this.clientPort = new ClientConnectionPort({
      portName: portName ||'app'
    })

    this.clientPort.on('redirect', appRedirect)

  }

  clientRedirect(router,route) {
    const remotePort = this.clientPort.getRemotePort()
    console.log(this, remotePort)
    remotePort.postMessage({ apiType: APITYPE_LOGOUT})
    route = route || {path:"/index"}
    console.log("route",route)
    router.push(route )
  }
}


function appRedirect(route) {
  this.$router(route)
}

export default ConnectionManager
