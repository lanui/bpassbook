const { EventEmitter } = require('events');
const log = require('loglevel');
const ObservableStore = require('obs-store');

import { encryptor, decryptor } from '@/lib/powershit';
import { validBookItem } from '@/lib/util';

/**
 *
 */
class GitbookController extends EventEmitter {
  /**
   *
   * @param {Object} opts {initState}
   * @property {boolean} isUnlocked
   * @property {object} initState
   * @property {string} selectedAddress
   * @property {number} ts datetime
   * @property {hex} cipher
   *
   */
  constructor(opts) {
    super();
    const initState = opts.initState || {};
    // console.log("GitbookController>>>",initState)
    this.encryptor = encryptor;
    this.decryptor = decryptor;
    this.selectedAddress = opts.selectedAddress || '';

    this.store = new ObservableStore(initState);

    this.store.subscribe(this.refreshMemStore.bind(this));

    /**
     * 内存中运行
     */
    this.memStore = new ObservableStore({
      isUnlocked: false,
      passbook: [],
    });
    this.refreshMemStore(initState);
  }

  updatePassbook() {}

  refreshMemStore(valState) {
    const { selectedAddress, ts, cipher } = valState;
    if (selectedAddress && cipher) {
      try {
        const deJsonText = decryptor(cipher, selectedAddress);
        const items = JSON.parse(deJsonText);

        this.memStore.updateState({
          isUnlocked: true,
          ts,
          passbook: items,
        });
      } catch (e) {
        log.warn('decrypt error', e);
      }
    }
  }

  addBookToStore(item, address) {
    if (!validBookItem(item)) {
      log.warn('item miss,no update store');
      return;
    }
    const ts = new Date().getTime();
    const state = this.store.getState();
    if (state) {
      address = address || state.selectedAddress || '';
    }
    if (address == '') {
      log.warn('address miss,no update store');
      return;
    }
    const storeCipher = state?.cipher || '';
    let items = [];
    try {
      if (storeCipher) {
        const jsontext = decryptor(storeCipher, address);
        items = JSON.parse(jsontext);
      }
    } catch (e) {}

    const index = items.findIndex((it) => it.tips === item.tips);
    if (index >= 0) {
      items.splice(index, 1, item);
    } else {
      items.push(item);
    }

    const originJSONStr = JSON.stringify(items);
    const newCipher = encryptor(originJSONStr, address);

    const newState = {
      ts,
      selectedAddress: address,
      cipher: newCipher,
    };

    this.store.putState(newState);
  }
}

export default GitbookController;
