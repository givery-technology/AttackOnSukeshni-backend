'use strict';
var
  express = require('express'),
  router = express.Router();

router.use(require('../middlewares/auth'));

// GET /users
router.get('/', function (req, res, next) {
  // res.json(["users"]);
  res.status(200).json(
    {
      "users":[
        {"id":1,"name":"owner1","image_url":null},
        {"id":2,"name":"owner2","image_url":null},
        {"id":3,"name":"owner3","image_url":null},
      ]
    });
  return next();
});

// GET /users/:id
router.get('/:id', function (req, res, next) {
  res.status(200).json(
    {
      id: req.params.id, name: "John Doe", "image_url":null
    });
  return next();
});


router.get('/:id/flowers', function (req, res, next) {
  res.status(200).json(
    {
      "flowers":[
        {"name": "flower1", "count": 3},
        {"name": "flower2", "count": 4},
        {"name": "flower3", "count": 5},
      ],
      "senders":[
        {"id": 1, "name": "user1", "image_url": null,"flower_name": "flower1", "message": "message1"},
        {"id": 2, "name": "user2", "image_url": null,"flower_name": "flower2", "message": "message2"},
        {"id": 3, "name": "user3", "image_url": null,"flower_name": "flower3", "message": "message3"},
        {"id": 4, "name": "user4", "image_url": null,"flower_name": "flower1", "message": "message4"},
      ]
    });
  return next();
});

router.post('/:id/flowers', function (req, res, next) {
  res.status(201);
  return next();
});


module.exports = router;
