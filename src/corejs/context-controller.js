import EventEmitter from 'events';
import { debounce } from 'lodash';

import KeyringController from 'eth-keyring-controller';

import { version } from '../manifest.json';

import MergeableObservableStore from '@/lib/storage/mergeable-observable-store';
import AppStateController from './app-state';
import NetworkController from './networks/network-controller';

import GitbookController from '@/lib/controllers/gitbook-controller';

const FIRST_TIME_INFO = 'firstTimeInfo';

class ContextController extends EventEmitter {
  constructor(opts) {
    super();
    this.defaultMaxListeners = 20;

    this.sendUpdate = debounce(this.privateSendUpdate.bind(this), 200);

    const initState = opts.initState || {};
    // console.log(" Back init state>>>>", initState)

    this.recordFirstTimeInfo(initState);

    this.store = new MergeableObservableStore(initState);

    this.networkController = new NetworkController(initState.NetworkController);

    this.appStateController = new AppStateController({
      initState: initState.AppStateController,
    });

    this.keyringController = new KeyringController({
      initState: initState.KeyringController,
      encryptor: opts.encryptor || undefined,
    });

    this.gitbookController = new GitbookController({
      initState: initState.GitbookController,
    });

    this.keyringController.memStore.subscribe((s) => this._onKeyringControllerUpdate(s));

    // Update
    this.store.updateStructure({
      AppStateController: this.appStateController.store,
      GitbookController: this.gitbookController.store,
    });

    this.memStore = new MergeableObservableStore(null, {
      AppStateController: this.appStateController.store,
      GitbookController: this.gitbookController.memStore,
    });

    this.memStore.subscribe(this.sendUpdate.bind(this));
  }

  getState() {
    console.log('getState emit>>>');
    const isInitialized = false;

    return {
      ...{ isInitialized },
      ...this.memStore.getFlatState(),
    };
  }

  getSelectedAddress() {
    const appState = this.appStateController.store.getState();
    return appState.selectedAddress || '';
  }

  recordFirstTimeInfo(initState) {
    if (!(FIRST_TIME_INFO in initState)) {
      initState[FIRST_TIME_INFO] = {
        version,
        date: Date.now(),
      };
    }
  }

  /**
   * login ,change state
   * return client
   */
  getInitState() {
    const isUnlocked = this.appStateController.isUnlocked;
    const AppStateController = this.appStateController.store.getState() || {};
    const GitbookController = this.gitbookController.memStore.getState() || {};
    const v3 = this.appStateController.v3 || null;
    const env3 = this.store.getState().env3 || null;

    return {
      isUnlocked,
      AppStateController,
      GitbookController,
      env3,
      v3,
    };
  }

  privateSendUpdate() {
    this.emit('update', this.getState());
  }

  async _onKeyringControllerUpdate(state) {
    const { keyrings } = state;
    const addresses = keyrings.reduce((acc, { accounts }) => acc.concat(accounts), []);

    if (!addresses.length) {
      return;
    }
  }

  async unlocked(password) {
    const state = this.store.getState();
    const env3 = state.env3;
    if (!env3) throw new Error('100001:no account.');

    const ret = await this.appStateController.unlock(password, env3);
    if (!ret) throw new Error('100002:password incorrect.');

    return this.getInitState();
  }

  async createWalletData(data) {
    const { env3, password, v3 } = data;

    if (!env3) throw new { code: 100009, message: 'lost env3' }();

    if (!password || !v3) throw { code: 100008, message: 'lost v3 or password' };

    try {
      const initState = Object.assign(this.store.getState(), { env3 });
      await this.store.putState(initState);
      const v3 = await this.appStateController.unlock(password, env3);
      const sendInitState = await this.getInitState();
      console.log('<<<<<<<<<<__>>>>>>>>>>>>>', sendInitState);
      return sendInitState;
    } catch (err) {
      console.warn(err);
      throw err;
    }
  }
}

export default ContextController;
