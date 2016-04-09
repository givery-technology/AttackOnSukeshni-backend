'use strict';
var
  express = require('express'),
  router = express.Router(),
  knex = require("../helpers/knex.js");

router.use(require('../middlewares/auth'));

// GET /users
router.get('/', function (req, res, next) {
  var users = [];
  knex('users')
  .then(function (rows) {
    if(!rows[0]) {
      res.status(404).send({
        "message": "User Not Found"
      });       
    }
    for ( var i=0; i<rows.length; i++ ) {
      users[i] = {
        "id": rows[i].id,
        "name": rows[i].name,
        "image_url": rows[i].image_url
      }
    }
    res.status(200).json({
      "users": users
    });
  }).catch(function(err) {
    res.status(400).send({
      "message": "Bad Request"
    });
  });
});

// GET /users/:id
router.get('/:id', function (req, res, next) {

  knex('users').where('id', req.params.id)
    .then(function (row) {
      if(!row[0]) {
        res.status(404).send({
          "message": "User Not Found"
        });       
      }
      res.status(200).send({
        "id": row[0].id,
        "name": row[0].name,
        "image_url": row[0].image_url
      });
    }).catch(function(err) {
      res.status(400);
    });
});


router.get('/:id/flowers', function (req, res, next) {
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

router.post('/:id/flowers', function (req, res, next) {

  //Need to test following code
  // knex('flowers').where('name', req.params.flower_name)
  //   .then(function(row){
  //     if(!row[0]) {
  //       res.status(404).send({
  //         "message": "Flower Not Found"
  //       });       
  //     }
  //     knex('user_flowers').insert({sender_user_id: req.body.sender_id, reciever_user_id: req.body.reciever_id, flower_id: row.id, message: req.body.message})
  //       .then(function() {
  //         return res.status(201);
  //       }).catch(function(err) {
  //         return res.status(400);
  //       });
  //   });
  res.status(201);
  return next();
});


module.exports = router;
