const path = require('path')

const pathjoin = (...p) => path.join(...p)

const ROOT_PATH = process.cwd()

const R = (...p) => path.resolve(__dirname, '../', ...p)

module.exports = {
  context: path.resolve(__dirname, '../'),
  dist: path.resolve(__dirname, "../dist"),
  src: path.resolve(__dirname, "../src"),
  icons: path.resolve(__dirname, '../src/icons'),
  manifest: path.resolve(__dirname,'../src/manifest.json'),
  pathjoin,
  R,
  ROOT_PATH,
}
