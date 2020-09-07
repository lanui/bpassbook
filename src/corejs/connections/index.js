import ClientConnectionPort from './client-port'
class ConnectionManager {
  constructor(opts){
    const {name,store} = opts
    this.clientPort = new ClientConnectionPort({
      portName: 'app'
    })

    this.clientPort.on('redirect', appRedirect)

  }


}


function appRedirect(data) {
  const $router = bpvue.$router
  console.log("appRedirect",data,this)
  bpvue.$router(data)
}

export default ConnectionManager
