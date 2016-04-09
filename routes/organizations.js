'use strict';
var
  express = require('express'),
  router = express.Router();

router.use(require('../middlewares/auth'));

router.get('/', function (req, res, next) {
  res.json(["organizations"]);
  return next();
});

module.exports = router;
