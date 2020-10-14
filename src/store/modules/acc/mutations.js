import * as types from './mutation-types';

export default {
  [types.UPDATE_BTS_BALANCE](state, balance) {
    state.btsBalance = balance;
  },
  [types.UPDATE_ETH_BALANCE](state, balance) {
    state.ethBalance = balance;
  },
};
