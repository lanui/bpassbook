import * as actions from './actions';
import * as getters from './getters';
import mutations from './mutations';

const p3 = {
  namespaced: true,
  actions,
  getters: {
    locked: (state) => state.locked,
    drawer: (state) => state.drawer,
    creating: (state) => state.creating,
    creatError: (state) => state.creatError,
    passbook: (state) => state.passbook,
    ...getters,
  },
  mutations,
  state: {
    activities: [],
    locked: true,
    drawer: false,
    creating: false,
    creatError: '',
    passbook: {
      tips: '',
      hostname: '',
      username: '',
      password: '',
      origin: '',
      favIconUrl: '',
    },
  },
};

export default p3;
