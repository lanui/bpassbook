export const chainId = (state) => state.chainId;
export const web3State = (state) => {
  return {
    chainId: state.chainId,
    wallet: state.wallet,
  };
};

export const shortAddress = (state) => {
  if (!state.wallet || state.wallet.length < 10) return state.wallet || '';
  const full = state.wallet;
  const short = full.substr(0, 6) + '...' + full.substr(full.length - 4);

  return short;
};

export const networkColor = (state) => {
  const chainId = state.chainId;
  switch (chainId) {
    case 1:
      return 'rgba(3, 135, 137, 0.7)';
    case 3:
      return 'rgba(233, 21, 80, 0.7)';
    default:
      return 'grey darken-1';
  }
};

export const currentNickname = (state) => {
  if (!state.nickname) {
    if (!state.selectedAddress || state.selectedAddress.length < 10) return state.selectedAddress || '';
    const full = state.selectedAddress;
    const short = full.substr(0, 6) + '...' + full.substr(full.length - 4);

    return short || '';
  }
  return state.nickname || '';
};

/**
 *
 * @param {*} state
 */
export const latestGasParams = (state) => {
  let params = state.gasParams || {};
  const { exact, standardWait, safeLowWait, fastWait, fastestWait } = params;

  params.standardWaitDesc = standardWait && exact ? translateTime(standardWait) : '≈ 5 minutes';
  params.safeLowWaitDesc = safeLowWait && exact ? translateTime(safeLowWait) : '≈ 30 minutes';
  params.fastWaitDesc = fastWait && exact ? translateTime(fastWait) : '≈ 2 minutes';
  params.fastestWaitDesc = fastestWait && exact ? translateTime(fastestWait) : '≈ 30 seconds';

  return params;
};

function translateTime(num) {
  if (num < 1.0) {
    return `≈ ${num * 60} seconds`;
  } else if (num > 60) {
    return `≈ ${num / 60} hours`;
  } else {
    return `≈ ${num} minutes`;
  }
}
