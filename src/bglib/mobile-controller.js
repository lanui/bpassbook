const { EventEmitter } = require('events');
const log = require('loglevel');
const ObservableStore = require('obs-store');

import {
  VEX_ITEM_PROP_MISS,
  SECRET_KEY_ILLEGAL,
  SUB_SECRET_KEY_ILLEGAL,
  INTERNAL_ERROR,
  VEX_ITEM_EXIST,
  VEX_ITEM_DELETE,
  VEX_ITEM_EDIT,
} from '@/lib/cnst/error-codes';
import { transferTerms } from './item-transfer';

const LOG_PREFFIX = 'MobileController';
/**
 * MobileController
 * store:BlockNumber,Hash,Cypher64,
 * memState:{Plain}
 */
class MobileController extends EventEmitter {
  /**
   * @param {Object} opts
   * @property {bytes}
   * @property {Object} initState
   */
  constructor(opts) {
    super();

    const initState = opts.initState || {};

    this.store = new ObservableStore(initState);

    /** @type {ObservableStore} [items,diff(will remove),Plain] */
    this.memStore = new ObservableStore({ items: [], diff: '' });
  }

  async reloadMemStore(Plain, Cypher64) {
    if (!Plain || !Cypher64) {
      return;
    }

    try {
      const view = Plain && Plain.View ? Plain.unwrap().View : [];
      const items = transferTerms(Plain);
      // console.log(`${LOG_PREFFIX} >>reloadMemStore>`,items)
      await this.memStore.updateState({ Plain, items });
    } catch (err) {
      log.error('MobileController>>reloadMemStore', err);
    }
  }

  /**
   * @param {bytes} key buffer
   * @param {object} message
   * @property {string}  apiType
   * @property {object} data [tips,username,password]
   */
  async addItem(key, { apiType, data }) {
    if (!key) {
      throw { code: SUB_SECRET_KEY_ILLEGAL, message: 'secret key is null.' };
    }

    const { tips, username, password } = data;

    const cipher64 = await this.getCypher64();
    if (!cipher64) {
      throw { code: INTERNAL_ERROR, message: 'lost data cipherText.' };
    }

    try {
      const file = UpdateCmdAdd(key, cipher64, new Term(tips, username, password));
      // console.log(`${LOG_PREFFIX} >>>`,file)

      const { Plain, Cypher64 } = file;

      await this.store.updateState({ Cypher64 });
      await this.reloadMemStore(Plain, Cypher64);

      return true;
    } catch (error) {
      throw { code: VEX_ITEM_EXIST, message: `tips ${tips} has been exist.` };
    }
  }

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
   * @param {*} key
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
      //const {}
      return true;
    } catch (error) {
      log.warn(`delete ${item} error.`, error);
      throw { code: VEX_ITEM_DELETE, message: `tips unfound.` };
    }
  }

  /**
   *
   */
  async getCypher64() {
    const storeState = await this.store.getState();
    return storeState.Cypher64 || '';
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
      const items = transferTerms(Plain);
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
}

export default MobileController;
