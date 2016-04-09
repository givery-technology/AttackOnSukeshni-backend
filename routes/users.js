'use strict';
var
  express = require('express'),
  router = express.Router();

router.use(require('../middlewares/auth'));

// GET /users
router.get('/', function (req, res, next) {
  res.json(["users"]);
  return next();
});

// GET /users/:id
router.get('/:id', function (req, res, next) {
  res.json({id: req.params.id, name: "John Doe"});
  return next();
})

module.exports = router;
