const library = 'NgwConnector';

const package = require('./package.json');
const common = require('../build-tools/lib/webpack.config');

module.exports = (env, argv) => {
  const configs = common(env, argv, {
    library,
    package,
    externals: true,
    dirname: __dirname,
  }).map((config) => {
    config.externals = config.externals || {};
    config.externals.buffer = 'root Buffer';
    config.externals.url = 'root url';
    config.externals.http = 'root http';
    config.externals.https = 'root https';
    config.node = {
      global: false,
    };

    return config;
  });
  return configs;
};
