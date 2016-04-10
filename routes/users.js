'use strict';
var
  express = require('express'),
  router = express.Router(),
  knex = require("../helpers/knex.js");

router.use(require('../middlewares/auth'));

// GET /users
router.get('/', function (req, res, next) {
  let 
    offset = req.body.offset || 0,
    limit = req.body.limit || 20;
  knex
    .select('id', 'name', 'image_url')
    .from('users')
    .offset(offset).limit(limit)
    .then(function (rows) {
      if(!rows[0]) {
        res.status(404).send({
          "message": "User Not Found"
        });       
      }
      res.status(200).json(rows);
    }).catch(function(err) {
      res.status(500).json(err);
    });
});

// GET /users/:id
router.get('/:id', function (req, res, next) {

  knex('users')
  .join('user_flowers', 'users.id', '=', 'user_flowers.receiver_user_id')
  .join('flowers', 'user_flowers.flower_id', '=', 'flowers.id')
  .select('users.id', 'users.name', 'users.image_url', 'flowers.name as flower').count('flowers.id as count')
  .groupBy('users.id', 'flowers.name')
  .where({'users.id': req.params.id})
    .then(function (row) {
      if(!row[0]) {
        res.status(404).json(new Error("User Not Found"));
        return next();
      }
      let user = {
        id: row[0].id,
        name: row[0].name,
        image_url: row[0].image_url,
      }
      let flowers = row.map(function(elem) {
        return {
          name: elem.flower,
          count: elem.count
        }
      });
      res.status(200).json({
        user: user,
        flowers: flowers,
      });
      return next();
    }).catch(function(err) {
      res.status(400).json(err);
      return next();
    });
});

router.get('/:id/flowers', function(req, res, next) {
  let
    begin_id = req.body.begin_id || 0,
    limit    = req.body.limit || 20;

  knex('user_flowers as uf')
    .join('flowers', 'uf.flower_id', '=', 'flowers.id')
    .join('users as sender', 'uf.sender_user_id', '=', 'sender.id')
    .select('uf.id', 'uf.sender_user_id', 'sender.name as sender_name', 'sender.image_url', 'flowers.name as flower_name', 'uf.message', 'uf.created_at')
    .where({'uf.receiver_user_id': req.params.id})
    .andWhere('uf.id', '>', begin_id)
    .limit(limit)
    .then(function(rows) {
      return res.status(200).json({
        send: rows.map(function(elem) {
          return {
            send_id: elem.id,
            sender: {
              id: elem.sender_user_id,
              name: elem.sender_name,
              image_url: elem.image_url 
            },
            flower_name: elem.flower_name,
            message: elem.message,
            sent_at: elem.created_at
          }
        })
      });
    });
});

router.post('/:id/flowers', function (req, res, next) {

  knex('flowers').where('name', req.body.flower_name)
    .then(function(row){
      if(!row[0]) {
        res.status(404).send({
          "message": "Flower Not Found"
        });
        return next();
      }
      knex('user_flowers').insert({sender_user_id: req.body.sender_id, receiver_user_id: req.params.id, flower_id: row[0].id, message: req.body.message})
        .then(function(row) {
          return res.status(201).send({
            "id": row
          });
        }).catch(function(err) {
          return res.status(400).json(err);
        });
    });
});


module.exports = router;
