const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secret = require('../config/env.config.js').jwt_secret;

exports.verifyRefreshBodyField = (req, res, next) => {
  if (req.body && req.body.refresh_token) {
    return next();
  }
  return res.status(400).send({ error: 'need to pass refresh_token field' });
};

exports.validRefreshNeeded = (req, res, next) => {
  const b = new Buffer(req.body.refreshToken, 'base64');
  const freshToken = b.toString();
  const hash = crypto.createHmac('sha512', req.jwt.refreshKey).update(req.jwt.userId + secret).digest('base64');
  if (hash === freshToken) {
    req.body = req.jwt;
    return next();
  }
  return res.status(400).send({ error: 'Invalid refresh token' });
};

exports.validJWTNeeded = (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const authorization = req.headers.authorization.split(' ');
      if (authorization[0] !== 'Bearer') {
        return res.status(401).send();
      }
      req.jwt = jwt.verify(authorization[1], secret);
      return next();
    } catch (err) {
      return res.status(403).send();
    }
  } else {
    return res.status(401).send();
  }
};
