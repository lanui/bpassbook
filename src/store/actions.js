
import * as types from './mutation-types';

import LocalStore from '@/lib/storage/local-store'
import { version } from '@/manifest.json'


const passworder = require('browser-passworder')




export const setFoo = ({ commit }, payload) => {
  commit(types.UPDATE_FOO, payload);
};

export const setChainId = ({ commit }, chainId) => {
  commit(types.UPDATE_CHAINID, chainId)
}

export const toggleRightDrawer = ({commit,state}) => {
  const rdrawer = state.rdrawer
  commit(types.UPDATE_RDRAWER, !rdrawer)
}

export const changeRightDrawer = ({commit},flag) =>{
  commit(types.UPDATE_RDRAWER, flag)
}

export const unlockWallet = ({commit},password) =>{
  commit(types.UPDATE_UNLOCKED,Boolean(password))
}

export const loadLocalVault = async ({commit,state},password) =>{
  console.log('loadLocalVault>>>>>')
  const key = state.key
  const local = new LocalStore()
  const localStore = await local.get()


  if (localStore && localStore.data && localStore.data.env3) {
    const v3 = await passworder.decrypt(password, localStore.data.env3)
    commit(types.SET_V3, v3)
  }
}

export const createAndSaveAccount = async ({commit},creator) => {
  try{
    const local = new LocalStore()
    const v3 = creator.getV3()
    if(v3){

      const env3s = await passworder.encrypt(creator.password,v3)
      if (!env3s) throw new Error('encrypt v3 fail')
      let localStore = (await local.get()) || { 'firstTimeInfo': { version,date:Date.now()}}
      const env3 = JSON.parse(env3s)
      localStore = Object.assign({}, localStore,{env3})

      await local.set(localStore)
      commit(types.SET_V3, v3)
      commit(types.UPDATE_UNLOCKED,true)

    }
  }catch(err) {
    throw err
  }
}
