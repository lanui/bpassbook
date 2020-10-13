import { TITLE_DELIMITER } from '@/bglib/item-transfer';
export const passwordRules = [
  (value) => !!value || 'Password Required.',
  (v) => (v && v.length >= 4) || 'Min 4 characters',
  (v) => (v && v.length <= 30) || 'Max 50 characters',
];

export const mobileTipsRules = [
  (v) => (!!v && v.trim().length > 0) || 'Tips is required.',
  (v) => !new RegExp(TITLE_DELIMITER, 'g').test(v) || `Tips are not allowed to contain \'${TITLE_DELIMITER}\'.`,
];
/**
 *
 */
export const titleSuffixRules = [
  (v) => !new RegExp(TITLE_DELIMITER, 'g').test(v) || `Tips are not allowed to contain \'${TITLE_DELIMITER}\'.`,
];

export const hostnameRules = [
  (v) => (!!v && v.trim().length > 0) || 'Domain is required. like www.baidu.com',
  (v) =>
    /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/.test(v) ||
    'Website Domain incorrect.',
];

export const validItem = (item) => {
  if (!item) throw 'username and password is null.';

  // if (!item.origin || !item.origin.length) throw 'please entry the website url.';
  // if (!validUrl(item.origin)) throw 'url format is incorrect.';

  if (!item.hostname || !validDomain(item.hostname)) {
    throw 'Website Domain incorrect.';
  }

  if (!item.username || item.username.trim().length == 0) throw 'please entry username.';
  if (!item.password || item.password.trim().length == 0) throw 'please entry username.';
  if (!item.tips || item.tips.trim().length == 0) throw 'please entry tips.';
  if (item.username.includes(TITLE_DELIMITER)) throw `Username cannot contain '${TITLE_DELIMITER}'.`;
};

export const validMobItem = (item) => {
  if (!item) throw 'format illegal.';

  if (!item.tips) throw 'tips required.';
  if (!item.username && item.username.trim().length <= 0) throw 'username required.';
  if (!item.password && item.password.trim().length <= 0) throw 'password required.';

  if (item.tips.includes(TITLE_DELIMITER)) throw `tips cannot contains ${TITLE_DELIMITER}.`;
};

export const trimProps = (item) => {
  if (typeof item !== 'object') return item;
  const keys = Object.keys(item);
  for (let i = 0; i < keys.length; i++) {
    const v = item[keys[i]];
    if (typeof v === 'string') {
      item[keys[i]] = v.trim();
    } else if (typeof v === 'number' || typeof v === 'boolean') {
      item[keys[i]] = v.toString();
    }
  }
  return item;
};

export function validUrl(url) {
  const strRegex =
    '^((https|http)?://)' +
    "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + //ftp user@
    '(([0-9]{1,3}.){3}[0-9]{1,3}' + // IP URL- 199.194.52.184
    '|' + // allow IP & DOMAIN
    "([0-9a-z_!~*'()-]+.)*" + // domain- www.
    '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' + // subdomian
    '[a-z]{2,6})' + // first level domain- .com or .museum
    '(:[0-9]{1,4})?' + // port- :80
    '((/?)|' + // a slash isn't required if there is no file name
    "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";

  const re = new RegExp(/(http|https):\/\/([\w.]+\/?)\S*/);

  return re.test(url);
}

export function validDomain(domain) {
  return /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/.test(domain);
}
