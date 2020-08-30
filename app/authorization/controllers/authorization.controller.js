import { sign } from 'jsonwebtoken';
import { randomBytes, createHmac } from 'crypto';
import { jwt_secret as jwtSecret } from '../../../common/config/env.config';

export function login(req, res) {
  try {
    const refreshId = req.body.userId + jwtSecret;
    const salt = randomBytes(16).toString('base64');
    const hash = createHmac('sha512', salt).update(refreshId).digest('base64');
    req.body.refreshKey = salt;
    const token = sign(req.body, jwtSecret);
    // eslint-disable-next-line no-buffer-constructor
    const b = new Buffer(hash);
    const freshToken = b.toString('base64');
    res.status(201).send({ accessToken: token, refreshToken: freshToken });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
}

export function refreshToken(req, res) {
  try {
    req.body = req.jwt;
    const token = sign(req.body, jwtSecret);
    res.status(201).send({ id: token });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
}
