const morgan = require('morgan');

const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const AuthorizationRouter = require('./app/authorization/routes.config');
const UsersRouter = require('./app/users/routes.config');
const PatientRouter = require('./app/patient/routes.config');
const config = require('./common/config/env.config.js');
require('dotenv').config();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
  if (req.method === 'OPTIONS') {
    return res.send(200);
  }
  return next();
});

app.use(morgan((tokens, req, res) => [
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  tokens.res(req, res, 'content-length'), '-',
  tokens['response-time'](req, res), 'ms',
].join(' ')));

app.use(bodyParser.json());
AuthorizationRouter.routesConfig(app);

// config routes
const publicFiles = `${__dirname}/public`;
app.use('/', express.static(publicFiles));
UsersRouter.routesConfig(app);
PatientRouter.routesConfig(app);

app.listen(config.port, () => {
  console.log('APP RUNNING IN PORT %s', config.port);
});
