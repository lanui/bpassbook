import * as actions from './actions';
import * as getters from './getters';
import mutations from './mutations';
const app = {
  namespaced: true,
  actions,
  getters: {
    remoteSaving: (state) => state.remoteSaving,
    remoteSaveError: (state) => state.remoteSaveError,
    stepid: (state) => state.stepid,
    ...getters,
  },
  mutations,
  state: {
    ldrawer: null,
    dense: true,
    clipped: false,
    mini: false,
    curnavs: [{ i18n: 'home', path: '/' }],
    mnemonics: '',
    createpwd: '',
    remoteSaving: false,
    remoteSaveError: '',
    stepid: 1,
  },
};
export default app;
