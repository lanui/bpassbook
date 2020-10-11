const { EventEmitter } = require('events');
const log = require('loglevel');
const ObservableStore = require('obs-store');

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

    this.memStore = new ObservableStore({
      isUnlocked: false,
      items: [],
    });
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
    if (typeof key === 'object') {
      const _state = this.store.getState();
      const { Cypher64 } = _state;

      if (Cypher64) {
      } else {
        //TODO init
      }
    } else {
      log.warn('unlock mobile data failure.because key illegal.');
    }
  }
}

export default MobileController;
