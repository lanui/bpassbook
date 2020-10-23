const pkgJson = require('../package.json');

const DEF_APP_NAME = 'BPassword';

module.exports = {
  APP_NAME: process.env.APP_NAME || DEF_APP_NAME,
  APP_VERSION: process.env.APP_VERSION || pkgJson.version,
  NODE_ENV: process.env.NODE_ENV || 'development',
};
