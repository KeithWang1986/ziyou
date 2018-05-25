'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/ziyou.min.js');  
} else {
  module.exports = require('./dist/ziyou.js');
}