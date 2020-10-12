/**
 * TODO sync chain data
 * @param {*} state
 */
export const mergeItems = (state) => {
  return state.items;
};

export const mobItemsState = (state) => {
  return state.mobItems;
};

/**
 *
 * @param {object} state
 */
export const mobdiff = (state) => {
  const mobPlain = state.mobPlain;

  if (!mobPlain || !mobPlain.ChainData || !Array.isArray(mobPlain.ChainData) || !Array.isArray(mobPlain.View)) {
    return '';
  }

  const diff = mobPlain.View.length - mobPlain.ChainData.length;
  if (diff === 0) return '';
  return diff > 0 ? '+' + diff : '' + diff;
};

/**
 *
 * @param {object} state
 */
export const webdiff = (state) => {
  const webPlain = state.webPlain;

  if (!webPlain || !webPlain.ChainData || !Array.isArray(webPlain.ChainData) || !Array.isArray(webPlain.View)) {
    return '';
  }

  const diff = webPlain.View.length - webPlain.ChainData.length;
  if (diff === 0) return '';
  return diff > 0 ? '+' + diff : '' + diff;
};
