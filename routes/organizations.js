'use strict';
var
  express = require('express'),
  router = express.Router(),
  knex   = require('../helpers/knex');

router.use(require('../middlewares/auth'));

router.get('/', function (req, res, next) {
  let offset = req.body.offset || 0;
  let limit  = req.body.limit || 20;
  knex
    .select('id', 'name', 'image_url')
    .from('organizations')
    .offset(offset).limit(limit)
    .then(function(rows) {
      res.status(200).json(rows);
      return next();
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
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
