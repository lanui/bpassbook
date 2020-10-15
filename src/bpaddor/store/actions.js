import * as types from './mutation-types';

export const updateInitState = async (
  { commit },
  { SenderState, AppStateController, isUnlocked, WebsiteController }
) => {
  commit(types.UPDATE_IS_UNLOCKED, isUnlocked);

  if (SenderState) {
    const { tabId, frameId, filterHost, favIconUrl } = SenderState;
    commit(types.UPDATE_TABID, tabId);
    commit(types.UPDATE_FAVICONURL, favIconUrl);
    commit(types.UPDATE_FILTER_HOST, filterHost);
  }
  if (isUnlocked && typeof WebsiteController === 'object') {
    const { items, Plain } = WebsiteController;
    commit(types.UPDATE_ITEMS, items);
  }
};
