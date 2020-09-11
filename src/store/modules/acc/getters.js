export const ethBalText = state => {
  const bal = state.ethBalance
  return bal ? parseFloat(bal.toString()).toFixed(4) : '0'
}

export const btsBalText = state => {
  const bal = state.btsBalance
  return bal ? parseFloat(bal.toString()).toFixed(4) : '0'
}
