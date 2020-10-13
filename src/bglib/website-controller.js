const { EventEmitter } = require('events');
const log = require('loglevel');
const ObservableStore = require('obs-store');

import { transferTerms } from './item-transfer';

import {
  VEX_ITEM_PROP_MISS,
  SECRET_KEY_ILLEGAL,
  SUB_SECRET_KEY_ILLEGAL,
  INTERNAL_ERROR,
  VEX_ITEM_EXIST,
  VEX_ITEM_DELETE,
  VEX_ITEM_EDIT,
} from '@/lib/cnst/error-codes';

const LOG_PREFFIX = 'WebsiteController';

/**
 * WebsiteController
 * store:BlockNumber,Hash,Cypher64
 * memState:{Plain}
 */
class WebsiteController extends EventEmitter {
  /**
   *
   * @param {Object} opts
   * @property {Object} initState
   * @property {string} Cypher64
   * @property {string} mainAddress
   */
  constructor(opts) {
    super();
    const initState = opts.initState || {};

    this.store = new ObservableStore(initState);
    /** @type {ObservableStore} [items,Plain] */
    this.memStore = new ObservableStore({ items: [] });
  }

  /**
   *
   * @param {buffer} key
   * @param {object} messsage [apiType,data]
   */
  async addItem(key, { data }) {
    if (!key) {
      throw { code: SUB_SECRET_KEY_ILLEGAL, message: 'secret key is null.' };
    }

    console.log(`${LOG_PREFFIX}>>addItem>>>`, data);
    const { tips, username, password } = data;
    const cipher64 = await this.getCypher64();
    if (!cipher64) {
      throw { code: INTERNAL_ERROR, message: 'lost data cipherText.' };
    }

    try {
      const file = UpdateCmdAdd(key, cipher64, new Term(tips, username, password));

      const { Plain, Cypher64 } = file;

      await this.store.updateState({ Cypher64 });
      await this.reloadMemStore(Plain, Cypher64);

      return true;
    } catch (error) {
      log.warn(error);
      throw { code: VEX_ITEM_EXIST, message: `tips ${tips} has been exist.` };
    }
  }

  /**
   *
   * @param {*} key
   * @param {*} param1
   */
  async updateItem(key, { data }) {
    if (!key || !data || !data.tips) {
      throw { code: VEX_ITEM_PROP_MISS, message: 'arguments miss.' };
    }
    try {
      const { tips, username, password } = data;
      const cipher64 = await this.getCypher64();
      const f = UpdateCmdChange(key, cipher64, new Term(tips, username, password));

      const { Plain, Cypher64 } = f;
      await this.store.updateState({ Cypher64 });
      await this.reloadMemStore(Plain, Cypher64);
      return true;
    } catch (error) {
      log.warn(`update ${item} error.`, error);
      throw { code: VEX_ITEM_EDIT, message: `tips unfound.` };
    }
  }

  /**
   *
   * @param {buffer} key
   * @param {object} message
   */
  async deleteItem(key, { data }) {
    if (!key || !data || !data.tips) {
      throw { code: VEX_ITEM_PROP_MISS, message: 'arguments miss.' };
    }

    try {
      const cipher64 = await this.getCypher64();
      const f = UpdateCmdDelete(key, cipher64, new Term(data.tips, null, null));

      const { Plain, Cypher64 } = f;
      await this.store.updateState({ Cypher64 });
      await this.reloadMemStore(Plain, Cypher64);

      return true;
    } catch (error) {
      log.warn(`delete ${item} error.`, error);
      throw { code: VEX_ITEM_DELETE, message: `tips unfound.` };
    }
  }

  /**
   *
   * @param {object} Plain
   * @param {string} Cypher64
   */
  async reloadMemStore(Plain, Cypher64) {
    if (!Plain || !Cypher64) {
      return;
    }

    try {
      const items = transferTerms(Plain, true);
      await this.memStore.updateState({ Plain, items });
    } catch (err) {
      log.error(`${LOG_PREFFIX}>>reloadMemStore:`, err);
    }
  }

  /**
   *
   * @param {Object:Buffer bytes} key
   */
  async unlocked(key) {
    if (typeof key !== 'object') {
      log.warn('unlock mobile data failure.because key illegal.');
      throw { code: SECRET_KEY_ILLEGAL, message: 'sub private key is null.' };
    }
    const _state = this.store.getState();
    const { Cypher64 } = _state;

    if (Cypher64) {
      const Plain = decryptToPlainTxt(key, Cypher64);
      const items = transferTerms(Plain, true);
      this.memStore.updateState({ Plain, items });
    } else {
      //init
      const file = InitFile(key);
      const { Plain, Cypher64 } = file;
      this.memStore.updateState({ Plain });
      const { BlockNumber, Hash } = Plain;
      this.store.updateState({ Cypher64, BlockNumber, Hash });
    }
  }

  async getCypher64() {
    const storeState = await this.store.getState();
    return storeState.Cypher64 || '';
  }
}

export default WebsiteController;
