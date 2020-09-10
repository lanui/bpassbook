import log from 'loglevel'

import * as types from './mutation-types'

import { getWebCli } from '@/web3js'



export const loadBalances = async ({ commit, rootState }, payload) => {
  console.log("acc/loadBalances",rootState)
  const address = await rootState.selectedAddress

  const web3Cli = getWebCli()

  const ret = await web3Cli.getBalances(address)
  console.log(ret)
  commit(types.UPDATE_ETH_BALANCE,ret.ethBalance)

}



