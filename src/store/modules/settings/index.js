import * as getters from './getters'
import actions from './actions'
import mutations from './mutations'

const settings = {
  namespaced: true,
  actions,
  getters:{
    autoLockedMins: state => state.autoLockedMins,
    ...getters,
  },
  mutations,
  state: {
    autoLockedMins: 5,
  },
}

export default settings
