const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const jwtSecret = require('../../../common/config/env.config.js').jwt_secret;

exports.login = (req, res) => {
  try {
    const refreshId = req.body.userId + jwtSecret;
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.createHmac('sha512', salt).update(refreshId).digest('base64');
    req.body.refreshKey = salt;
    const token = jwt.sign(req.body, jwtSecret);
    const b = new Buffer(hash);
    const freshToken = b.toString('base64');
    res.status(201).send({ accessToken: token, refreshToken: freshToken });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
};

exports.refresh_token = (req, res) => {
  try {
    req.body = req.jwt;
    const token = jwt.sign(req.body, jwtSecret);
    res.status(201).send({ id: token });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
};
