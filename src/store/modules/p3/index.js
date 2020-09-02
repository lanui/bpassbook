import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const p3 = {
  namespaced:true,
  actions,
  getters,
  mutations,
  state:{
    activities:[],
    locked:true,
  }
}

export default p3
