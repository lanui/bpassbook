
import EventEmitter from 'events'
import ObservableStore from 'obs-store'

import MergeableObservableStore from '@/lib/storage/mergeable-observable-store'

import { ROPSTEN, MAINNET } from './enums'

const defaultProviderConfig = {
  type: ROPSTEN,
}

const defaultNetworkConfig = {
  ticker: 'ETH'
}

class NetworkController extends EventEmitter {
  constructor(opts = {}) {
    super()

    const provideConfig = opts.provider || defaultNetworkConfig
    this.networkStore = new ObservableStore('loading')
    this.providerStore = new ObservableStore(provideConfig)
    this.networkConfig = new ObservableStore(defaultProviderConfig)

    this.store = new MergeableObservableStore({
      provider: this.providerStore,
      network:this.networkStore,
      settings:this.networkConfig
    })

    this._provider = null

  }
}

export default NetworkController
