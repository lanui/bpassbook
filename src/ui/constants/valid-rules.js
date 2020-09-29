export const passwordRules = [
  (value) => !!value || 'Password Required.',
  (v) => (v && v.length >= 4) || 'Min 4 characters',
  (v) => (v && v.length <= 30) || 'Max 50 characters',
];

export const validItem = (item) => {
  if (!item) throw 'username and password is null.';

  if (!item.origin || !item.origin.length) throw 'please entry the website url.';
  if (!validUrl(item.origin)) throw 'url format is incorrect.';
  if (!item.hostname) {
    const url = new URL(item.origin);
    item.hostname = url.hostname;
  }

  if (!item.username || item.username.trim().length == 0) throw 'please entry username.';
  if (!item.password || item.password.trim().length == 0) throw 'please entry username.';
  if (!item.tips || item.tips.trim().length == 0) throw 'please entry tips.';
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
