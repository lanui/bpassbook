import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const p3 = {
  namespaced: true,
  actions,
  getters: {
    locked: (state) => state.locked,
    drawer: (state) => state.drawer,
    creating: (state) => state.creating,
    creatError: (state) => state.creatError,
    ...getters,
  },
  mutations,
  state: {
    activities: [],
    locked: true,
    drawer: false,
    creating: false,
    creatError: '',
  },
};

export default p3;
