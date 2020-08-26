import * as types from './mutation-types';

export const setFoo = ({ commit }, payload) => {
  commit(types.UPDATE_FOO, payload);
};

export const setChainId = ({ commit }, chainId) => {
  commit(types.UPDATE_CHAINID, chainId)
}

export const toggleRightDrawer = ({commit,state}) => {
  const rdrawer = state.rdrawer
  commit(types.UPDATE_RDRAWER, !rdrawer)
}

export const changeRightDrawer = ({commit},flag) =>{
  commit(types.UPDATE_RDRAWER, flag)
}
