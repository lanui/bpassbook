import ObservableStore from 'obs-store';
import EventEmitter from 'events';
import log from 'loglevel';
import { fromV3 } from 'ethereumjs-wallet';

const passworder = require('browser-passworder');

export default class AppStateController extends EventEmitter {
  constructor(opts = {}) {
    const { isUnlocked, initState, chainId } = opts;

    super();

    this.store = new ObservableStore(
      Object.assign(
        {
          timeoutMinutes: 0,
          chainId: chainId || 3,
        },
        initState
      )
    );

    this.isUnlocked = Boolean(isUnlocked);

    this.timer = null;
  }

  /**
   * dpv3
   * @param {*} param0
   */
  async updateKeyPairs(dev3 = {}) {
    const { MainPriKey, SubPriKey } = dev3;
    this.dev3 = dev3;
    if (MainPriKey && SubPriKey) {
      this.isUnlocked = true;
    } else {
      this.isUnlocked = false;
    }
  }

  /**
   * SubPriKey handle null.
   */
  getSubPrivateKey() {
    const dev3 = this.dev3;
    return dev3 ? dev3.SubPriKey : null;
  }

  async updateSelectedAddress(selectedAddress = '') {
    await this.store.updateState({ selectedAddress });
  }

  /**
   * @deprecated see context-controller and this file updateKeyPairs
   * @param {*} password
   * @param {*} env3
   */
  async unlock(password, env3) {
    try {
      console.log('Unlocked By password>>>>', password, env3);
      const text = JSON.stringify(env3);
      const v3 = await passworder.decrypt(password, text);

      const wallet = await fromV3(v3, password);
      if (wallet) {
        this.wallet = wallet;
        const selectedAddress = wallet.getChecksumAddressString();
        const privateKey = wallet.getPrivateKeyString();
        const publicKey = wallet.getPublicKeyString();

        this.store.updateState({ selectedAddress, privateKey, publicKey });
      }

      console.log('wallet unlocked success>>>', v3);
      this.isUnlocked = true;
      this.v3 = v3;
      return v3;
    } catch (err) {
      log.warn('>>>>>>>>>>>>>>>>', err);
      throw err;
    }
  }

  /**
   * @deprecated old v3 keystore
   * @param {*} param0
   */
  async loginUpdateState({ v3, isUnlocked, wallet, selectedAddress, privateKey, publicKey }) {
    this.v3 = v3;
    this.isUnlocked = isUnlocked;
    this.wallet = wallet;
    await this.store.updateState({ selectedAddress, privateKey, publicKey });
  }

  async locked() {
    // this.isUnlocked = false;
    this.updateKeyPairs({});
    // this.v3 = null
    return true;
  }

  setSelectAddress() {
    if (this.wallet) {
      const addressHex = this.wallet.getChecksumAddressString();
      this.selectAddress = addressHex;
    }
  }

  getAppState() {
    return {
      isUnlocked: this.isUnlocked,
      selectAddress: this.selectAddress || '',
    };
  }

  _reset() {
    this.updateKeyPairs({});
  }
}
