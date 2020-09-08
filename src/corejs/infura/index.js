

const PROJECT_ID = "1362a998079949baaea80eb017fe1f0f"

export function getInfuraProviderURL(chainId) {
  switch (chainId) {
    case 1:
      return `https://mainnet.infura.io/v3/${PROJECT_ID}`
    case 3:
      return `https://ropsten.infura.io/v3/${PROJECT_ID}`
    default:
      throw new Error('unsupport.')
  }
}

export function getInfuraProviderWSURL(chainId) {
  switch (chainId) {
    case 1:
      return `wss://mainnet.infura.io/ws/v3/${PROJECT_ID}`
    case 3:
      return `wss://ropsten.infura.io/ws/v3/${PROJECT_ID}`
    default:
      throw new Error('unsupport.')
  }
}

export default getInfuraProviderURL
