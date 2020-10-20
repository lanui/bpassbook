import * as getters from './getters';
import actions from './actions';
import mutations from './mutations';

const settings = {
  namespaced: true,
  actions,
  getters: {
    icons: (state) => state.icons,
    autoLockedMins: (state) => state.autoLockedMins,
    ...getters,
  },
  mutations,
  state: {
    autoLockedMins: 5,
    icons: {
      ARROW_LEFT_MDI: 'mdi-chevron-left',
      ARROW_RIGHT_MDI: 'mdi-chevron-right',
      ITEM_DEL_MDI: 'mdi-delete-forever-outline',
    },
  },
};

export default settings;
