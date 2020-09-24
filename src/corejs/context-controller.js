import EventEmitter from 'events';
import { debounce } from 'lodash';

import KeyringController from 'eth-keyring-controller';

import { fromV3 } from 'ethereumjs-wallet';

const passworder = require('browser-passworder');

import { version } from '../manifest.json';

import MergeableObservableStore from '@/lib/storage/mergeable-observable-store';
import AppStateController from './app-state';
import NetworkController from './networks/network-controller';

import GitbookController from '@/lib/controllers/gitbook-controller';

import { INCORRECT_PWD, errorMessage, responseMessage, responseInitState } from '@/lib/message-utils';

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
  async getInitState() {
    const isUnlocked = this.appStateController.isUnlocked;
    const AppStateController = (await this.appStateController.store.getState()) || {};
    const GitbookController = (await this.gitbookController.memStore.getState()) || {};
    const v3 = this.appStateController.v3 || null;
    const env3 = (await this.store.getState().env3) || null;

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
    try {
      const state = await this.store.getState();
      const env3 = state.env3;
      if (!env3) throw { code: 100001, message: 'lost env3' };
      const ret = await this.appStateController.unlock(password, env3);
      const respState = await this.getInitState();
      return respState;
    } catch (error) {
      throw {
        code: 100002,
        message: error.toString(),
      };
    }
  }

  /**
   * Popup login
   * @param {Object} message
   * @property apiType string
   * @property data Object the request data
   * @property data:password required
   * @property data:redirect optional
   */
  async login(message) {
    if (typeof message !== 'object' || typeof message.data !== 'object') {
      return errorMessage();
    }

    const { password, redirect } = message.data;
    if (password === undefined || password === '') {
      return errorMessage('lost password', {
        originApi: message.apiType,
      });
    }

    const env3 = (await this.store.getState()).env3;
    if (!env3) return errorMessage('lost env3 data.');

    //unlock
    try {
      const text = JSON.stringify(env3);
      const v3 = await passworder.decrypt(password, text);

      const wallet = await fromV3(v3, password);
      if (!wallet) return errorMessage('env3 error.', { originApi: message.apiType });

      const selectedAddress = wallet.getChecksumAddressString();
      const privateKey = wallet.getPrivateKeyString();
      const publicKey = wallet.getPublicKeyString();

      await this.appStateController.loginUpdateState({
        v3,
        isUnlocked: true,
        wallet,
        selectedAddress,
        privateKey,
        publicKey,
      });

      const sendInitState = await this.getInitState();
      //
      return responseInitState(message.apiType, Object.assign({ redirect }, sendInitState));
    } catch (err) {
      console.log('ERROR>>>>>>>>>>>>>', err);
      return errorMessage(err.message, { code: INCORRECT_PWD, originApi: message.apiType });
    }
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

  /**
   * apiType,[env3,password,nextStepId]
   * @param {Object} message
   */
  async saveNewWalletForLived(message) {
    const { apiType, data } = message;
    if (typeof data !== 'object' || !data.env3 || data.password === undefined) {
      return errorMessage('lost env3 or password.', { originApi: apiType });
    }

    try {
      const { env3, password, nextStepId } = data;
      const text = JSON.stringify(env3);
      const v3 = await passworder.decrypt(password, text);

      const wallet = await fromV3(v3, password);
      if (!wallet) return errorMessage('env3 error.', { originApi: message.apiType });
      const selectedAddress = wallet.getChecksumAddressString();
      const privateKey = wallet.getPrivateKeyString();
      const publicKey = wallet.getPublicKeyString();

      const initState = Object.assign(await this.store.getState(), { env3 });
      await this.store.putState(initState);

      await this.appStateController.loginUpdateState({
        v3,
        isUnlocked: true,
        wallet,
        selectedAddress,
        privateKey,
        publicKey,
      });

      const sendInitState = await this.getInitState();
      return responseMessage(message.apiType, Object.assign({ nextStepId, isUnlocked: true }, sendInitState));
    } catch (error) {
      return errorMessage(err.message, { code: INCORRECT_PWD, originApi: message.apiType });
    }
  }
}

export default ContextController;
