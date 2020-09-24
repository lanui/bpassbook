import * as types from './mutation-types';

export default {
  [types.UPDATE_LDRAWER](state, ldrawer) {
    state.ldrawer = ldrawer;
  },
  [types.UPDATE_DENSE](state, dense) {
    state.dense = dense;
  },
  [types.UPDATE_MINI](state, mini) {
    state.mini = Boolean(mini);
  },
  [types.UPDATE_CURNAVS](state, curnavs) {
    state.curnavs = curnavs || ['home'];
  },
  [types.SET_REMOTE_ERROR](state, errorMsg = '') {
    state.remoteSaveError = errorMsg;
  },
  [types.SET_REMOTE_SAVING](state, loading = false) {
    state.remoteSaving = loading;
  },
  [types.SET_STEPID](state, stepid = 1) {
    if (stepid < 1 || stepid > 4) stepid = 1;
    state.stepid = stepid;
  },
};
