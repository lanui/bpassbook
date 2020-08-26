import * as types from './mutation-types';

export default {
  [types.UPDATE_CHAINID](state, chainId) {
    state.chainId = chainId;
  },
  [types.UPDATE_RDRAWER](state,bShow) {
    state.rdrawer = Boolean(bShow)
  }

};
