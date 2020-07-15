'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./lib/cancelable-promise.cjs.prod.js');
} else {
  module.exports = require('./lib/cancelable-promise.cjs.js');
}
