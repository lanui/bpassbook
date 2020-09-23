import ClientConnectionPort from './client-port';
import { APITYPE_LOGOUT } from '@/corejs/enums';
import { BACKEND_CONN_POPUP } from '@/lib/cnst/connection-cnst';

class ConnectionManager {
  constructor(opts) {
    const { portName } = opts;
    this.clientPort = new ClientConnectionPort({
      portName: portName || BACKEND_CONN_POPUP,
    });

    this.clientPort.on('redirect', appRedirect);
  }

  clientRedirect(router, route) {
    const remotePort = this.clientPort.getRemotePort();
    console.log(this, remotePort);
    remotePort.postMessage({ apiType: APITYPE_LOGOUT });
    route = route || { path: '/index' };
    console.log('route', route);
    router.push(route);
  }
}

function appRedirect(route) {
  this.$router(route);
}

export default ConnectionManager;
