import * as actions from './actions'
import * as getters from './getters'

import mutations from './mutations'


export default {
  namespaced: true,
  actions,
  mutations,
  getters:{
    // selectedAddress:state => state.selectedAddress,
    ethBalance:state => state.ethBalance,
    btsBalance:state => state.btsBalance,
    ...getters,
  },
  state:{
    ethBalance:null,
    btsBalance:null,
    // selectedAddress:null,

  }
}
