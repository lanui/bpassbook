
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
    commit(types.SET_BIPINIT,true)
    commit(types.SET_V3, v3)
  }
}

export const loadBipinit = async ({commit},payload) =>{
  commit(types.SET_BIPINIT, payload)
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
      localStore = Object.assign({}, localStore,{data:{env3}})

      await local.set(localStore)
      commit(types.SET_V3, v3)
      commit(types.UPDATE_UNLOCKED,true)
    }
  }catch(err) {
    throw err
  }
}

export const updateFromBackground = async ({commit},payload)=> {
  console.log("action>>", payload)


  if(payload.env3) {
    const { v3, isUnlocked, selectAddress } = payload
    console.log("---------------->",isUnlocked)
    commit(types.SET_BIPINIT,true)
    commit(types.SET_ENV3, payload.env3)
    commit(types.UPDATE_UNLOCKED, isUnlocked)
    commit(types.UPDATE_SELECTADDRESS, selectAddress)

  }
}

export const updateUnlockBackground = async ({commit},payload) =>{
  console.log("data actions>>>",payload)
  commit(types.UPDATE_SELECTADDRESS, payload.selectAddress)
  commit(types.UPDATE_UNLOCKED, payload.isUnlocked)
}
