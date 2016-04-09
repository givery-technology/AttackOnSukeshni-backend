'use strict';

module.exports = function auth (req, res, next) {
  function hasTokenHeader (rq) {
    var token = rq.headers.token || rq.body.token || rq.query.token;
    return !!token;
  }
  if (hasTokenHeader(req)) {
    return next();
  }
  res.status(401).send({ 
    "message": 'No token provided. Already logged out' 
  });
  return res.end();
};