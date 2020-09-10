export const ROPSTEN = 'ropsten'
export const RINKEBY = 'rinkeby'
export const KOVAN = 'kovan'
export const MAINNET = 'mainnet'
export const GOERLI = 'goerli'
export const LOCALHOST = 'localhost'

export const MAINNET_NETWORK_ID = '1'
export const ROPSTEN_NETWORK_ID = '3'
export const RINKEBY_NETWORK_ID = '4'
export const GOERLI_NETWORK_ID = '5'
export const KOVAN_NETWORK_ID = '42'

export const MAINNET_CHAIN_ID = '0x1'
export const ROPSTEN_CHAIN_ID = '0x3'
export const RINKEBY_CHAIN_ID = '0x4'
export const GOERLI_CHAIN_ID = '0x5'
export const KOVAN_CHAIN_ID = '0x2a'

export const ROPSTEN_DISPLAY_NAME = 'Ropsten'
export const RINKEBY_DISPLAY_NAME = 'Rinkeby'
export const KOVAN_DISPLAY_NAME = 'Kovan'
export const MAINNET_DISPLAY_NAME = 'Main Ethereum Network'
export const GOERLI_DISPLAY_NAME = 'Goerli'

export const INFURA_PROVIDER_TYPES = [
  ROPSTEN,
  // RINKEBY,
  // KOVAN,
  MAINNET,
  // GOERLI,
]

export const INFURA_PROVIDER_SUPPORTS = [
  MAINNET_NETWORK_ID,
  ROPSTEN_NETWORK_ID
]

/**
 *
 * @param {*} chainId
 */
export const networkSupport = (chainId) => {
  return INFURA_PROVIDER_SUPPORTS.find(id => id === chainId) ? true : false
}

export const getNetwork = (chainId) => {
  switch (chainId) {
    case MAINNET_NETWORK_ID:
      return MAINNET_DISPLAY_NAME;
    case ROPSTEN_NETWORK_ID:
      return ROPSTEN_DISPLAY_NAME;

    default:
      return ROPSTEN_DISPLAY_NAME;
  }
}

export const DEFAULT_CHAINID = ROPSTEN_NETWORK_ID
