const library = 'Dialog';

const package = require('./package.json');
const common = require('../build-tools/lib/webpack.config');

module.exports = (env, argv) => {
  return common(env, argv, {
    library,
    package,
    externals: true,
    dirname: __dirname,
  });
};