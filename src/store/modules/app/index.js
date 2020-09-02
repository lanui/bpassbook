import actions from './actions'
import getters from './getters'
import mutations from './mutations'
const app = {
  namespaced:true,
  actions,
  getters,
  mutations,
  state:{
    ldrawer:null,
    dense:true,
    clipped:false,
    mini:false,
    curnavs:[{i18n:'home',path:'/'}],
    mnemonics:'',
    createpwd:'',
  }
}
export default app
