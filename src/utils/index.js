export const compressAddress = (address) => {
  if(address === undefined ) return ''
  if (typeof address === 'object' || typeof address === 'function') throw new Error('addres type error.')
  address = '' + address
  if(!address || address.length <12) return address

  const len = address.length
  const ret = address.substr(0, 6) + '...' + address.substr(len - 4)

  return ret
}

export const etherscanUrl = ({hex,chainId,type}) =>  {
  if(!hex) throw new Error('hex must ')
  const network = chainId === 1 ? "mainnet" : "ropsten"
  const subpath = type || 'tx'
  //https://ropsten.etherscan.io/tx/0xf387...34fbf47d
  return `https://${network}.etherscan.io/${subpath}/${hex}`
}
