import { fromWei } from 'web3-utils';

export const ethBalText = (state) => {
  const bal = state.ethBalance || '0';
  return parseFloat(fromWei(bal.toString(), 'ether')).toFixed(4);
};

export const btsBalText = (state) => {
  const bal = state.btsBalance;
  return bal ? parseFloat(bal.toString()).toFixed(4) : '0';
};
