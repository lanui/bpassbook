export const chainId = state => state.chainId;
export const web3State = state => {
  return {
    chainId: state.chainId,
    wallet:state.wallet,
  }
}

export const shortAddress = state => {
  if (!state.wallet || state.wallet.length < 10) return state.wallet||''
  const full = state.wallet
  const short = full.substr(0,6) + '...' + full.substr(full.length-4)

  return short
}

export const networkColor = state => {
  const chainId = state.chainId
  switch (chainId) {
    case 1:
      return 'rgba(3, 135, 137, 0.7)'
    case 3:
      return 'rgba(233, 21, 80, 0.7)'
    default:
      return 'grey darken-1';
  }
}

export const currentNickname = (state) => {
  return state.nickname ||''
}
