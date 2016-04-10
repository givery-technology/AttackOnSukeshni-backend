'use strict';
var
  express = require('express'),
  router = express.Router(),
  knex   = require('../helpers/knex');

router.use(require('../middlewares/auth'));

router.get('/', function(req, res, next) {
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

router.post('/', function(req, res, next) {
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
  knex('organizations')
    .join('organization_members', 'organizations.id', '=', 'organization_members.organization_id')
    .join('user_flowers', 'organization_members.user_id', '=', 'user_flowers.sender_user_id')
    .join('flowers', 'user_flowers.flower_id', '=', 'flowers.id')
    .select('organizations.id', 'organizations.name', 'organizations.image_url', 'flowers.name as flower').count('flowers.id as count')
    .groupBy('organizations.id', 'flowers.name')
    .where({'organizations.id': req.params.id})
    .then(function(rows) {
      if (rows.length === 0) {
        res.status(404).json(new Error("Organizations Not Found"));
        return next();
      }
      let organization = {
        id: rows[0].id,
        name: rows[0].name,
        image_url: rows[0].image_url,
      };
      let flowers = rows.map(function(elem) {
        return {
          name: elem.flower,
          count: elem.count
        };
      });
      res.status(200).json({
        organization: organization,
        flowers: flowers,
      });
      return next();
    });
});

router.get('/:id/flowers', function(req, res, next) {
  var begin_id = req.body.begin_id || 0;
  var limit = req.body.limit || 20;
  knex('user_flowers as uf')
    .join('flowers', 'uf.flower_id', '=', 'flowers.id')
    .join('organization_members', 'uf.sender_user_id', '=', 'organization_members.user_id')
    .join('organizations', 'organization_members.organization_id', '=', 'organizations.id')
    .select('uf.id', 'flowers.name', 'uf.message')
    .groupBy('organizations.id', 'flowers.name')
    .where({'organizations.id': req.params.id})
    .andWhere('uf.id', '>', begin_id)
    .limit(limit)
    .then(function(rows) {
      console.log(rows);
      res.status(200).json({
        send: rows
      });
    });
});

module.exports = router;
