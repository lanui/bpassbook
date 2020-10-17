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
  commit(types.UPDATE_WEBSITE_ITEMS, items);
};

export const updateItems = async ({ commit }, items) => {
  commit(types.UPDATE_WEBSITE_ITEMS, items || []);
};

/**
 *
 * @param {object} context vuex
 * @param {object} WebsiteController [items,diff,Plain]
 */
export const reloadWebsiteControllerState = async ({ commit }, { items = [], Plain }) => {
  commit(types.UPDATE_WEBSITE_ITEMS, items);
  //Plain
  commit(types.UPDATE_WEBPLAIN, Plain);
};

/**
 *
 * @param {object} context vuex
 * @param {object} MobileController [items,diff,Plain]
 */
export const reloadMobileControllerState = async ({ commit }, { items, Plain }) => {
  commit(types.UPDATE_MOBILE_ITEMS, items);
  commit(types.UPDATE_MOBPLAIN, Plain);
};

/**
 *
 * @param {*} param0
 * @param {*} item
 */
export const toggleWebItemShowpwd = async ({ commit }, item) => {
  commit(types.TOGGLE_PWD_SHOW, item);
};
