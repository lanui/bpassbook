import { utils } from 'web'

export const balanceFormat = (balance,length = 4) => {
  if(balance === undefined) return ''
  const { isBN, toWei, fromWei } = utils
  let valStr;
  if ( (typeof balance === 'object' && isBN(balance) ) ||
    typeof balance === 'string' || typeof balance === 'number') {
    const val = toWei(fromWei(balance)).toString()
    return parseFloat(val).toFixed(length)
  }else {
    throw new Error('Balance entry a error type',balance)
  }
}
