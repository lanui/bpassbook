import * as types from './mutation-types';

export const updateState = async ({ commit }, payload = {}) => {
  const { isUnlocked, items, selectedAddress } = payload;
  commit(types.UPDATE_ISUNLOCK, isUnlocked);
  if (items) commit(types.UPDATE_ITEMS, items);
  commit(types.UPDATE_SELECTED_ADDRESS, selectedAddress);
};

/**
 *
 * @param {object} context vuex
 * @param {object} initState
 * @property {boolean} isUnlocked
 * @property {object} env3
 * @property {object} WebsiteController [items,Plain]
 */
export const updateInitState = async (
  { commit },
  { SenderState, AppStateController, isUnlocked, WebsiteController, env3 }
) => {
  commit(types.UPDATE_ISUNLOCK, isUnlocked);

  if (isUnlocked && typeof WebsiteController === 'object') {
    const { items, Plain } = WebsiteController;
    commit(types.UPDATE_ITEMS, items);
    commit(types.UPDATE_PLAIN, Plain);
  }

  if (AppStateController && AppStateController.selectedAddress) {
    commit(types.UPDATE_SELECTED_ADDRESS, AppStateController.selectedAddress);
  }

  if (SenderState) {
    const { tabId, frameId, filterHost, favIconUrl } = SenderState;
    commit(types.UPDATE_FILTER_HOST, filterHost);
    commit(types.UPDATE_TABID, tabId);
    commit(types.UPDATE_FAVICON_URL, favIconUrl);
  }
  // const { isUnlocked, GitbookController, AppStateController } = initState;
  // commit(types.UPDATE_ISUNLOCK, isUnlocked);
  // commit(types.UPDATE_SELECTED_ADDRESS, AppStateController?.selectedAddress || '');
  // const items = GitbookController?.passbook;
  // if (items) commit(types.UPDATE_ITEMS, items);
};
