import EventEmitter from 'events'
import {version} from '../manifest.json'

import MergeableObservableStore from '../lib/storage/MergeableObservableStore'

const FIRST_TIME_INFO = 'firstTimeInfo'

class ContextController extends EventEmitter {
  constructor(opts) {
    super()
    this.defaultMaxListeners = 20

    const initState = opts.initState || {}
    this.recordFirstTimeInfo(initState)

    this.store = new MergeableObservableStore(initState)

    // TODO keyringController

  }

  getState() {
    // TODO const vault = this.ke
  }

  recordFirstTimeInfo(initSate) {
    if (!(FIRST_TIME_INFO in initState)) {
      initSate[FIRST_TIME_INFO] = {
        version,
        date: Date.now()
      }
    }
  }
}

export default ContextController
