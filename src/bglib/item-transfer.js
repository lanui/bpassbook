export const TITLE_DELIMITER = ';';
export const TITLE_DELIMITER_REGEX = /;|(\w+)/g;
export const UI_ITEM_PROPS = ['tips', 'username', 'password'];
export const UI_PASSBOOK_PROPS = [...UI_ITEM_PROPS, 'hostname'];

export const transferPlain = (Plain, { isPassbook = false }) => {
  if (typeof Plain !== 'object' || !Plain.ChainData || !Plain.Commit || !Plain.View) {
    throw `Argument Plain illegal. ${typeof Plain === 'object' ? JSON.stringify(Plain) : Plain}`;
  }

  const { ChainData, View } = Plain;
  if (typeof ChainData !== 'object' || !Array.isArray(ChainData)) {
    throw `ChainData not array. ${ChainData}`;
  }
  if (typeof View !== 'object' || !Array.isArray(View)) {
    throw `View not array. ${View}`;
  }

  const diff = (View.length - ChainData.length).toString();
};

export const getDiff = (Plain) => {
  if (!Plain || !Plain.ChainData || !Array.isArray(Plain.ChainData) || !Array.isArray(Plain.View)) {
    return '';
  }

  const diffNumber = Plain.View.length - Plain.ChainData.length;
  if (diffNumber === 0) return '';
  return diffNumber > 0 ? '+' + diffNumber : '' + diffNumber;
};

/**
 * @param {array} terms
 * @param {Boolean} isPassbook,default false
 */
export const transferTerm = (terms, isPassbook = false) => {
  if (!terms || !Array.isArray(terms)) {
    return [];
  }

  const items = terms
    .map((term) => {
      const title = term.title || '';
      const i = {
        tips: title,
        username: term.name || null,
        password: term.password || null,
      };

      const rets = SplitTitle(title);
      if (isPassbook && rets.length === 2) {
        i.hostname = rets[0];
      }
      return i;
    })
    .filter((it) => it.tips !== null && it.username !== null && it.password !== null);

  return items;
};

function SplitTitle(title) {
  if (typeof title !== 'string') {
    return [];
  }
  const rets = title.match(new RegExp(TITLE_DELIMITER_REGEX)).filter((r) => r !== '' && r !== TITLE_DELIMITER);
  return rets;
}
