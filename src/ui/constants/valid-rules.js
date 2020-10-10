export const passwordRules = [
  (value) => !!value || 'Password Required.',
  (v) => (v && v.length >= 4) || 'Min 4 characters',
  (v) => (v && v.length <= 30) || 'Max 50 characters',
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
};

export const validMobItem = (item) => {
  if (!item) throw 'format illegal.';

  if (!item.tips) throw 'tips required.';
  if (!item.username && item.username.trim().length <= 0) throw 'username required.';
  if (!item.password && item.password.trim().length <= 0) throw 'password required.';
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
