import { networkSupport, DEFAULT_CHAINID } from '@/corejs/networks/enums.js'

export async function getInitChainId() {
  const local = new LocalStorage()
  const ret = await local.get()
  if (ret && ret.data && ret.data.AppStateController
    && ret.data.AppStateController.chainId) {
    const chainId = ret.data.AppStateController.chainId
    return networkSupport(chainId) ? chainId : DEFAULT_CHAINID
  } else {
    return DEFAULT_CHAINID
  }
}
