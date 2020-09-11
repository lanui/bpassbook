import log from 'loglevel'

import * as types from './mutation-types'

import { getWebCli } from '@/web3js'


/**
 * get Balances
 * @param {*} param0
 * @param {*} payload
 */
export const loadBalances = async ({ commit, rootState }, payload) => {
  const address = await rootState.selectedAddress
  const web3Cli = getWebCli()
  const ret = await web3Cli.getBalances(address)
  commit(types.UPDATE_ETH_BALANCE,ret.ethBalance)

  return ret
}



