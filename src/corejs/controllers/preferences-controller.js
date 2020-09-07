import ObservableStore from 'obs-store'

class PreferencesController {
  constructor(opts={}) {
    const initState = Object.assign({
      tokens:[]
    },opts.initState)


    this.store = new ObservableStore(initState)
  }
}

export default PreferencesController
