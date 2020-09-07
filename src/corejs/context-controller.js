import EventEmitter from 'events'
import { debounce } from 'lodash'

import KeyringController from 'eth-keyring-controller'

import {version} from '../manifest.json'

import MergeableObservableStore from '@/lib/storage/MergeableObservableStore'
import AppStateController from './app-state'

const FIRST_TIME_INFO = 'firstTimeInfo'

class ContextController extends EventEmitter {
  constructor(opts) {
    super()
    this.defaultMaxListeners = 20

    this.sendUpdate = debounce(this.privateSendUpdate.bind(this),200)

    const initState = opts.initState || {}
    console.log(">>>", initState)
    this.recordFirstTimeInfo(initState)

    this.store = new MergeableObservableStore(initState)

    this.appStateController = new AppStateController({
      initState: initState.AppStateController
    })

    this.keyringController = new KeyringController({
      initState: initState.KeyringController,
      encryptor: opts.encryptor || undefined
    })

    this.keyringController.memStore.subscribe((s) => this._onKeyringControllerUpdate(s))


    this.store.updateStructure({
      AppStateController: this.appStateController.store,
    })

    this.memStore = new MergeableObservableStore(null,{
      AppStateController: this.appStateController.store
    })

    this.memStore.subscribe(this.sendUpdate.bind(this))

  }

  getState() {
    console.log('getState emit>>>')
    const isInitialized = false

    return {
      ...{ isInitialized },
      ...this.memStore.getFlatState(),
    }
  }

  recordFirstTimeInfo(initState) {
    if (!(FIRST_TIME_INFO in initState)) {
      initState[FIRST_TIME_INFO] = {
        version,
        date: Date.now()
      }
    }
  }

  privateSendUpdate(){
    this.emit('update',this.getState())
  }

  async _onKeyringControllerUpdate(state) {
    const {keyrings} = state
    const addresses = keyrings.reduce((acc,{accounts}) => acc.concat(accounts),[])

    if(!addresses.length){
      return
    }
  }

}

export default ContextController
