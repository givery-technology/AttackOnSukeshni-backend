'use strict';

var
  express = require('express'),
  app = express(),
  router = express.Router(),
  parser = require('body-parser'),
  port = process.env.PORT || 3000;

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/organizations', require('./routes/organizations'));

app.listen(port, function() {
  console.log('Server running with port', port);
});
