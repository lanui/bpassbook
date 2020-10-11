const { EventEmitter } = require('events');
const log = require('loglevel');
const ObservableStore = require('obs-store');

import { SECRET_KEY_ILLEGAL } from '@/lib/cnst/error-codes';

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

    //TODO
    this.memStore = new ObservableStore({});
  }

  async reloadMemStore(key, cipher64) {
    if (!key || !cipher64) {
      return;
    }

    try {
    } catch (err) {
      log.error('MobileController>>reloadMemStore', err);
    }
  }

  async addItemOrUpdate(item) {}

  async deleteItem(item) {}

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
      this.memStore.updateState({ Plain });
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
