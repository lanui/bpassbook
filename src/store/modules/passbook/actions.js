import idb from '@/corejs/indexdb';
import { getTipsAvatar } from '@/corejs/utils';
import * as types from './mutation-types';

export const addItem = async ({ commit }, item) => {
  try {
    const keystr = '' + item.tips;
    const iconText = getTipsAvatar(keystr);
    const key = keystr.toBase64();
    const ts = new Date().getTime();
    const ret = await idb.setPassbook(key, Object.assign(item, { key, iconText, ts }));
    return ret;
  } catch (err) {
    console.log(err);
  }
};

export const reloadItemsFromLocal = async ({ commit }) => {
  const items = (await idb.getAllPassbook()) || [];
  commit(types.UPDATE_ITEMS, items);
};
