import EventEmitter from 'events'
import log from 'loglevel'

import ObservableStore from 'obs-store'
import Web3 from 'web3'

import { getInfuraProviderURL, getInfuraProviderWSURL } from '@/corejs/infura'
import { DEFAULT_CHAINID } from '@/corejs/networks/enums.js'


log.enableAll()


/**
 *
 */
class Web3Client extends EventEmitter {
  constructor(opts = {}) {
    super()
    this.chainStore = new ObservableStore(DEFAULT_CHAINID)

    const _setWeb3 = SetWeb3.bind(this)
    this.chainStore.subscribe(function (value) {
      _setWeb3(value)
    })


    // stay at end
    this.chainStore.putState(DEFAULT_CHAINID)

  }

  getWeb3() {
    return this.web3
  }


  async getBalances(address, opts = {}) {
    const { isAddress } = Web3.utils
    if (!isAddress(address)) throw new Error(`Addres  ${address} illegal.`)

    this._checkEnv(opts)

    const web3js = this.web3 || global.web3;
    const ethBalance = await web3js.eth.getBalance(address)

    return {
      ethBalance,
    }

  }

  _checkEnv(opts) {
    const chainId = opts.chainId || this.chainStore.getState()
    if (!chainId) throw new Error('chainId no set.')

    if (!global.web3) {
      SetWeb3(chainId)
    }
  }


}



const SetWeb3 = function setWeb3(chainId) {

  const infuraURL = getInfuraProviderURL(chainId)
  const provider = new Web3.providers.HttpProvider(infuraURL)
  const web3 = new Web3(provider)
  this.web3 = web3
  global.web3 = web3
}


export default Web3Client

