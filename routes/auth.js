'use strict';
const
  express = require('express'),
  router  = express.Router(),
  knex    = require('../helpers/knex');

router.post('/signin', function (req, res, next) {
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
    .select('users.id', 'users.name', 'users.image_url')
    .where({
      'organizations.name': organization,
      'users.email': email
    }).then(function (rows) {
      if (rows.length === 0) {
        res.status(404).json("User Not Found");
      } else {
        let user = rows[0];
        res.status(200).json({
          user: {
            id: user.id,
            name: user.name,
            image_url: user.image_url,
          },
          token: "dummytoken",
        });
      }
      return next();
    }).catch(function (err) {
      return res.status(500).json(err);
    });

  // 404 if not found



});

module.exports = router;
