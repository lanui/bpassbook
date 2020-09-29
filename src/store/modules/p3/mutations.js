import * as types from './mutation-types';

export default {
  [types.LOAD_ACTIVITY](state, activities) {
    state.activities = activities || [];
  },
  [types.UPDATE_DRAWER](state, drawer) {
    state.drawer = Boolean(drawer);
  },
  [types.UPDATE_LOCKED](state, locked) {
    state.locked = Boolean(locked);
  },
  [types.UPDATE_CREATING_STATE](state, creating) {
    state.creating = creating;
  },
  [types.UPDATE_CREAT_ERROR](state, error) {
    state.creatError = error || '';
  },
  [types.UPDATE_UPDATE_PASSBOOK](state, pb = {}) {
    state.passbook = Object.assign({}, pb);
  },
};
