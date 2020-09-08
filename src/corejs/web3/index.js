import EventEmitter from 'events'
import log from 'loglevel'

import ObservableStore from 'obs-store'
import Web3 from 'web3'

import { getInfuraProviderURL, getInfuraProviderWSURL } from '@/corejs/infura'

class Web3Client extends EventEmitter {
  constructor(opts={}) {
    super()
    const chainId = opts.chainId ||3
    this.chainStore = new ObservableStore(chainId)

    const _setWeb3 = SetWeb3.bind(this)
    this.chainStore.subscribe(function (value){
      _setWeb3(value)
    })
  }


  getWeb3(){
    return this.web3
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

