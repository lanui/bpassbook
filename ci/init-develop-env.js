const SECRET_ENV_FILE = 'secret.env.js';

const fs = require('fs-extra');
const path = require('path');

const secretEnvTemplate = () => {
  return JSON.stringify(
    {
      INFURA_PROJECTID: '',
      INFURA_SECRET: '',
    },
    null,
    2
  );
};

startup();

async function startup() {
  const filepath = path.join(__dirname, SECRET_ENV_FILE);

  const exist = await fs.pathExists(filepath);

  if (exist) {
    console.log('Env file exist :', filepath);
    return;
  }

  const jsonContent = secretEnvTemplate();
  console.log('module.exports = ' + jsonContent);

  fs.outputFile(filepath, 'module.exports = ' + jsonContent, { encoding: 'utf8' }, (err) => {
    console.warn(err);
  });
}
