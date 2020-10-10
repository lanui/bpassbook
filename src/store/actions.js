// import { fromV3 } from 'ethereumjs-wallet';
import { OpenWallet } from '@/bglib/account-creator';
import { APITYPE_IMPORT_BPWALLET, APITYPE_IMPORT_NEWBPWALLET } from '@/lib/cnst/api-cnst';
import WhispererController from '@/lib/controllers/whisperer-controller';

import { getCurrentGas } from '@/lib/gas-helper';

import * as types from './mutation-types';

/**
 * login response Error
 * @param {*} param0
 * @param {*} errMsg
 */
export const setLoginError = ({ commit }, errMsg = '') => {
  commit(types.SET_LOGINERROR, errMsg);
  commit(types.SET_LOGINLOADING, false);
};

/**
 * common connect response error
 * @param {*} param0
 * @param {*} param1
 */
export const setLiveError = ({ commit }, { errMsg = '', loading = false }) => {
  commit(types.SET_LIVE_ERROR, errMsg);
  commit(types.SET_LIVE_LOADING, loading);
};

export const setLoginLoading = ({ commit }, loading) => {
  commit(types.SET_LOGINLOADING, Boolean(loading));
};

export const setChainId = ({ commit }, chainId) => {
  commit(types.UPDATE_CHAINID, chainId);
};

export const toggleRightDrawer = ({ commit, state }) => {
  const rdrawer = state.rdrawer;
  commit(types.UPDATE_RDRAWER, !rdrawer);
};

export const changeRightDrawer = ({ commit }, flag) => {
  commit(types.UPDATE_RDRAWER, flag);
};

export const unlockWallet = ({ commit }, password) => {
  commit(types.UPDATE_ISUNLOCKED, Boolean(password));
};

export const loadBipinit = async ({ commit }, payload) => {
  commit(types.SET_BIPINIT, payload);
};

/**
 * set vuex state from backend message
 * @param {*} param0
 * @param {*} payload
 */
export const updateFromBackground = async ({ commit }, payload) => {
  console.log('action>>', payload);

  commit(types.SET_BIPINIT, true);
  commit(types.SET_ENV3, payload.env3 || null);
  if (payload.AppStateController) {
    const { chainId, privateKey, publicKey, selectedAddress } = payload.AppStateController;
    commit(types.SET_WALLET_OPEN, { chainId, privateKey, publicKey, selectedAddress });
  }

  if (payload.isUnlocked) {
    commit(types.SET_BIPINIT, true);
    commit(types.UPDATE_ISUNLOCKED, payload.isUnlocked);
  }
};

/**
 *
 * @param {*} param0
 * @param {*} password
 */
export const decryptFromEnv3 = async ({ state }, password) => {
  const { env3 } = state;
  console.log('decryptFromEnv3', env3, password);
  if (!env3) throw new Error('no found env3');
  try {
    const dev3 = OpenWallet(env3, password);

    return {
      json: JSON.stringify(env3),
      dev3,
    };
  } catch (err) {
    throw err;
  }
};

export const updateInitState = async ({ commit, dispatch }, initState) => {
  const { isUnlocked, GitbookController, AppStateController, env3, v3 } = initState;

  commit(types.UPDATE_ISUNLOCKED, isUnlocked);
  if (isUnlocked) {
    commit(types.SET_BIPINIT, true);
    commit(types.SET_V3, v3);
    commit(types.SET_ENV3, env3);
  }

  if (AppStateController) {
    const { selectedAddress, chainId, privateKey, publicKey, nickname } = AppStateController;
    commit(types.SET_WALLET_OPEN, { chainId, privateKey, publicKey, selectedAddress });
    commit(types.UPDATE_NICKNAME, nickname);
  }
  if (GitbookController) {
    const passbook = GitbookController.passbook;
    await dispatch('passbook/updateItems', passbook);
  }
};

/**
 * import v3
 * @param {*} param0
 * @param {*} param1
 */
export const importWalletFormKeyStore = async ({ commit }, { keystore, password }) => {
  try {
    if (typeof keystore !== 'string') throw { type: 'keystore', message: 'Incorrect keystore format.' };

    const env3 = JSON.parse(keystore);
    const dev3 = OpenWallet(env3, password);
    const data = {
      env3,
      dev3,
      password,
    };

    const controller = new WhispererController({ name: 'Importor-Whisperer' });
    controller
      .sendSimpleMsg(APITYPE_IMPORT_BPWALLET, data)
      .then((resp) => {
        //TODO data sync
        commit(types.SET_V3, dev3);
        commit(types.SET_ENV3, env3);
        commit(types.UPDATE_SELECTEDADDRESS, env3.mainAddress);
        return true;
      })
      .catch((error) => {
        throw { type: 'keystore', message: 'parse keystore fail,please retry.' };
      });
  } catch (ex) {
    console.log('ex', ex);
    if (ex instanceof SyntaxError) {
      throw { type: 'keystore', message: 'Incorrect keystore format.' };
    } else if (ex instanceof Error && ex.message === 'message authentication code mismatch') {
      throw { type: 'password', message: 'Keystore and password do not match.' };
    } else if (typeof ex === 'object' && ex.type) {
      throw ex;
    } else {
      throw { type: 'password', message: 'Keystore and password do not match.' };
    }
  }
};

export const importNewWalletFormKeyStore = async ({ commit }, { keystore, password }) => {
  try {
    if (typeof keystore !== 'string') throw { type: 'keystore', message: 'Incorrect keystore format.' };

    const env3 = JSON.parse(keystore);
    const dev3 = OpenWallet(env3, password);
    const data = {
      env3,
      dev3,
      password,
    };
    await global.$connManager.createOrImportWallet(data);
    commit(types.UPDATE_ISUNLOCKED, true);
  } catch (ex) {
    console.log('ex', ex);
    if (ex instanceof SyntaxError) {
      throw { type: 'keystore', message: 'Incorrect keystore format.' };
    } else if (ex instanceof Error && ex.message === 'message authentication code mismatch') {
      throw { type: 'password', message: 'Keystore and password do not match.' };
    } else if (typeof ex === 'object' && ex.type) {
      throw ex;
    } else {
      throw { type: 'password', message: 'Keystore and password do not match.' };
    }
  }
};

/**
 *
 * @param {*} param0
 */
export const fetchGasParams = async ({ commit }, payload) => {
  getCurrentGas(payload)
    .then((params) => {
      console.log('>>>>>>>>>>>>>>fetchGasParams>>', params);
      commit(types.UPDATE_GAS_PARAMS, params);
    })
    .catch((error) => {
      console.log('>>>>>>>>>>>>>>fetchGasParams>Error>', error);
    });
};
