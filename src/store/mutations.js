import * as types from './mutation-types';

const DEFAULF_BIPKEY = true

export default {
  [types.UPDATE_CHAINID](state, chainId) {
    state.chainId = chainId;
  },
  [types.UPDATE_RDRAWER](state,bShow) {
    state.rdrawer = Boolean(bShow)
  },
  [types.SET_BIPINIT](state,key) {
    state.bipinit = key || DEFAULF_BIPKEY
  },
  [types.CLEAN_BIPINIT](state) {
    state.bipinit = null
  },
  [types.UPDATE_UNLOCKED](state,unlocked =false) {
    console.log(">>>>>", unlocked)
    state.unlocked = Boolean(unlocked)
  },
  [types.UPDATE_KEY](state,key = null) {
    state.key = key
  },
  [types.SET_V3](state,v3 = null) {
    state.v3 = v3
  },
  [types.UPDATE_SELECTADDRESS](state,address){
    state.wallet = address || ''
  },
  [types.SET_ENV3](state,env3) {
    state.env3 = env3||null
  }

};
