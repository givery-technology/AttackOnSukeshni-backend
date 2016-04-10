'use strict';
var
  express = require('express'),
  router = express.Router(),
  knex   = require('../helpers/knex');

router.use(require('../middlewares/auth'));

// GET /users
router.get('/', function(req, res, next) {
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
router.get('/:id', function(req, res, next) {
  res.status(200).json(
    {
      id: req.params.id, name: "John Doe", "image_url":null
    });
  return next();
});


router.get('/:id/flowers', function(req, res, next) {
  res.status(200).json(
    {
      "flowers":[
        {"name": "flower1", "count": 3},
        {"name": "flower2", "count": 4},
        {"name": "flower3", "count": 5},
      ],
      "send": [
      {
        "send_id": 2,
        "sender": 
          {"id": 2, "name": "user2", "image_url": null},
          "flower_name": "flower2", 
          "message": "message2"
      },
      {
        "send_id": 3,
        "sender": 
          {"id": 3, "name": "user3", "image_url": null},
          "flower_name": "flower3", 
          "message": "message3"
      },
      {
        "send_id": 4,
        "sender": 
          {"id": 4, "name": "user4", "image_url": null},
          "flower_name": "flower4", 
          "message": "message4"
      }]
    });
  return next();
});

router.post('/:id/flowers', function(req, res, next) {
  knex('flowers').where('name', req.body.flower_name)
    .then(function(row){
      if(!row[0]) {
        res.status(404).send({
          "message": "Flower Not Found"
        });       
      }
      knex('user_flowers').insert({sender_user_id: req.body.sender_id, reciever_user_id: req.body.reciever_id, flower_id: row[0].id, message: req.body.message})
        .then(function(row) {
          return res.status(201).send({
            "id": row
          });
        }).catch(function(err) {
          return res.status(400).send({err});
        });
    });
});


module.exports = router;
