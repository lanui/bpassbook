import ObservableStore from 'obs-store'

class MergeableObservableStore extends ObservableStore {
  constructor(initState, config) {
    super(initState)
    this.updateStructure(config)
  }

  updateStructure(config) {
    this.config = config
    this.removeAllListeners()

    for (const key in config) {
      config[key].subscribe((state) => {
        this.updateState({ [key]: state })
      })
    }
  }

  getFlatState() {
    let flatState = {}
    for (const key in this.config) {
      const controller = this.config[key]
      const state = controller.getState ? controller.getState() : controller.state

      flatState = {...flatState,...state}
    }
    return flatState
  }
}

export default MergeableObservableStore
