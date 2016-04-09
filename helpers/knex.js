'use strict';

var path = require('path');
module.exports = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '..', 'bloom.sqlite'),
  }
});