import { fromWei } from 'web3-utils';

export const ethBalText = (state) => {
  const bal = state.ethBalance || '0';
  return parseFloat(fromWei(bal.toString(), 'ether')).toFixed(4);
};

export const diamondsBalText = (state) => {
  const bal = state.ethBalance || '0';
  return (parseFloat(fromWei(bal.toString(), 'ether')) * 10000).toFixed(2);
};

export const btsBalText = (state) => {
  const bal = state.btsBalance;
  return bal ? parseFloat(bal.toString()).toFixed(2) : '0.00';
};
