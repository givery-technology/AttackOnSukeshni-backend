'use strict';
const
  express = require('express'),
  router  = express.Router(),
  knex    = require('../helpers/knex');

router.post('/signin', function(req, res, next) {
  function isEmpty (val) {
    return val === "" ||
            val === null ||
            val === undefined;
  }
  // validate
  console.log(req.body);
  let organization = req.body.organization_name;
  let email = req.body.email;
  let password = req.body.password;

  if ([organization, email, password].some(isEmpty)) {
    res.status(400).json({
      message: "BadRequest"
    });
    return next();
  }
  
  knex('users')
    .join('organization_members', 'users.id', '=', 'organization_members.user_id')
    .join('organizations', 'organization_members.organization_id', 'organizations.id')
    .select(
        'users.id as user_id',
        'users.name as user_name',
        'users.image_url as user_image_url',
        'organizations.id as organization_id',
        'organizations.name as organization_name',
        'organizations.image_url as organization_image_url'
    ).where({
      'organizations.name': organization,
      'users.email': email
    }).then(function(rows) {
      if (rows.length === 0) {
        res.status(404).json("User Not Found");
        return next();
      }
      let user = rows[0];
      res.status(200).json({
        user: {
          id: user_id,
          name: user_name,
          image_url: user_image_url,
        },
        organization: {
          id: organization_id,
          name: organization_name,
          image_url: organization_image_url,
        },
        token: "dummytoken",
      });
      return next();
    }).catch(function(err) {
      return res.status(500).json(err);
    });

});

module.exports = router;
