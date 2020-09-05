import EventEmitter from 'events'

import log from 'loglevel'


import LocalStore from '@/lib/storage/local-store'

class AppContextController extends EventEmitter {
  constructor(opts) {
    super()
    this.localStorage = new LocalStore()
    this.opts = opts
  }

  async loadStore(){

  }



  async persistData(state) {
    if (!state) {
      throw new Error('state is missing')
    }
    if (!state.data) {
      throw new Error('state does not have data')
    }

    if (this.localStorage.isSupported) {
      try{
        await LocalStore.set(state)
        this.store = state
      }catch(err){
        log.error('error setting state in local store:', err)
      }
    }
  }

}

export default AppContextController
