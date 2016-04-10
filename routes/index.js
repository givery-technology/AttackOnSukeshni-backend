var
  express = require('express'),
  router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
    error: null,
    result: {
      message: "Welcome!!",
      number: 472184,
      numberlist: [
        1, 2, 3,
      ],
      stringlist: [
        "this", "is", "a", "pen"
      ],
    },
  });
  return next();
});

router.get('/ping', function(req, res, next) {
  res.json('PONG');
  return next();
});

router.get('/notfound', function(req, res, next) {
  res.status(404).json('NotFound');
  return next();
});

router.post('/badrequest', function(req, res, next) {
  res.status(400).json('BadRequest');
  return next();
})

module.exports = router;
