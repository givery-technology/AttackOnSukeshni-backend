'use strict';
var
  express = require('express'),
  router = express.Router();

router.use(require('../middlewares/auth'));

router.get('/', function (req, res, next) {
  // mock data
  res.status(200).json({
    organizations: [
      {
        id: 1,
        name: "organization1",
        image_url: "https://google.com",
      },
      {
        id: 2,
        name: "organization2",
        image_url: null,
      },
    ]
  });
  return next();
});

router.post('/', function (req, res, next) {
  res.status(201).json({
    organization: {
      id: 100,
      name: req.organization_name,
      image_url: null,
    }
  });
  return next();
});

router.get('/:id', function(req, res, next) {
  // mock data
  res.status(200).json({
    organization: {
      id: req.params.id,
      name: "organization32",
      image_url: null,
    },
    flowers: [
      {
        name: "pansy",
        count: 23,
      },
      {
        name: "rose",
        count: 3,
      },
      {
        name: "blossom",
        count: 19
      },
    ]
  });
  return next();  
});

router.get('/:id/flowers', function (req, res, next) {
  res.status(200).json({
    flowers: [
      {
        name: "pansy",
        count: 23,
      },
      {
        name: "rose",
        count: 3,
      },
      {
        name: "blossom",
        count: 19
      },
    ],
    send: [
      {
        send_id: 23,
        flower_name: "blossom",
        message: "Fight!!",
      },
      {
        send_id: 25,
        flower_name: "cherry",
        message: "Oh god, so sleepy",
      },
    ]
  });
  return next();
});

module.exports = router;
