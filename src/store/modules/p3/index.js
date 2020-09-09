import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const p3 = {
  namespaced: true,
  actions,
  getters: {
    locked: state => state.locked,
    drawer: state => state.drawer,
    ...getters
  },
  mutations,
  state: {
    activities: [],
    locked: true,
    drawer: false,
  }
}

export default p3
