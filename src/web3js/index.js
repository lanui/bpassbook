import Web3 from 'web3'

/**
 * TODO instead corejs web3
 * @param {} chainId
 */
export const getWeb3js = async (chainId) => {
  //TODO if not exists need create web3
  return global.web3
}

export function getWebCli() {
  if (!global.web3Cli) {
    throw new Error('web3Cli not exists.')
  }
  return global.web3Cli
}

export async function getBalances(address, opts = {}){
  const { isAddress } = Web3.utils
  if (!isAddress(address)) throw new Error(`Addres  ${address} illegal.`)

  const chainId = opts.chainId || this.chainStore.getState()
  this._checkEnv(opts)

  const web3js = this.web3 || global.web3;
  const ethBalance = await web3js.eth.getBalance(addresss)

  return {
    ethBalance,
  }

}
