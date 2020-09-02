const PatientsController = require('./controllers/patients.controller');
const ValidationMiddleware = require('../../common/middlewares/auth.validation.middleware');
const config = require('../../common/config/env.config');

const routeAlias = `/${config.routeName}/patients`;

exports.routesConfig = function (app) {
  app.post(routeAlias, [
    PatientsController.insert,
  ]);

  app.get(routeAlias, [
    ValidationMiddleware.validJWTNeeded,
    PatientsController.list,
  ]);

  app.get('/patients/:patientId', [
    ValidationMiddleware.validJWTNeeded,
    PatientsController.getById,
  ]);

  app.patch('/patients/:patientId', [
    ValidationMiddleware.validJWTNeeded,
    PatientsController.patchById,
  ]);

  app.delete('/patients/:patientId', [
    ValidationMiddleware.validJWTNeeded,
    PatientsController.removeById,
  ]);
};
