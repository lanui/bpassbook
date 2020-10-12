import { VEX_ITEM_PROP_MISS } from '@/lib/cnst/error-codes';

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
 *
 * @param {Object} Plain [unwrap]
 * @param {boolean} isPassbook
 */
export const transferTerms = (Plain, isPassbook = false) => {
  if (!Plain) return [];
  const plainState = typeof Plain.unwrap === 'function' ? Plain.unwrap() : Plain;

  const { View, ChainData } = plainState;
  if (!Array.isArray(View)) return [];

  if (!Array.isArray(ChainData)) ChainData = [];

  const items = View.map((v) => {
    const title = v.title || '';
    const onchain = ChainData.find((c) => c.title == title);

    const i = {
      tips: title,
      onchain: Boolean(onchain),
      username: v.name || null,
      password: v.password || null,
    };

    const rets = SplitTitle(title);
    if (isPassbook && rets.length === 2) {
      i.hostname = rets[0];
    }
    return i;
  }).filter((it) => it.tips !== null && it.username !== null && it.password !== null);

  return items;
};

/**
 *
 * @param {object} item [tips,username,password]
 */
export const transferItemToTerm = (item) => {
  if (
    typeof item !== 'object' ||
    typeof item.tips === 'undefined' ||
    typeof item.username === 'undefined' ||
    typeof item.password === 'undedined'
  ) {
    throw { code: VEX_ITEM_PROP_MISS, message: 'item property miss.' };
  }

  return {
    title: item.tips,
    name: item.username,
    password: item.password,
  };
};

/**
 *
 * @param {*} term
 */
export const transferTermToItem = (term) => {
  if (typeof term !== 'object' || term.title === undefined) return null;

  const title = term.title;
  const rets = SplitTitle(title);

  return {
    username: term.name,
    password: term.password,
    tips: title,
    hostname: rets.length == 2 ? rets[0] : '',
  };
};

function SplitTitle(title) {
  if (typeof title !== 'string') {
    return [];
  }
  const rets = title.match(new RegExp(TITLE_DELIMITER_REGEX)).filter((r) => r !== '' && r !== TITLE_DELIMITER);
  return rets;
}

/**
 *
 * @param {*} Plain
 */
export const unwrapPlain = (Plain) => {
  if (typeof Plain === 'object') {
    return {
      BlockNumber: Plain.BlockNumber || 0,
      ChainData: Plain.ChainData && Plain.ChainData.data ? Plain.ChainData.data : Plain.ChainData,
      Commit: Plain.Commit && Plain.Commit.data ? Plain.Commit.data : Plain.Commit,
      View: Plain.View && Plain.View.data ? Plain.View.data : Plain.View,
      Trash: Plain.Trash && Plain.Trash.data ? Plain.Trash.data : Plain.Trash,
      Hash: Plain.Hash || '',
    };
  } else {
    return Plain;
  }
};

export const wrapPlain = (Plain) => {
  if (typeof Plain !== 'object') return Plain;

  return {
    BlockNumber: Plain.BlockNumber || 0,
    ChainData: Plain.ChainData && Plain.ChainData.data ? Plain.ChainData : { data: Plain.ChainData },
    Commit: Plain.Commit && Plain.Commit.data ? Plain.Commit.data : { data: Plain.Commit },
    View: Plain.View && Plain.View.data ? Plain.View.data : { data: Plain.View },
    Trash: Plain.Trash && Plain.Trash.data ? Plain.Trash.data : { data: Plain.Trash },
    Hash: Plain.Hash || '',
  };
};
