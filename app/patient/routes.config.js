const PatientsController = require('./controllers/patients.controller');
const PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../../common/middlewares/auth.validation.middleware');
const config = require('../../common/config/env.config');

const { ADMIN } = config.permissionLevels;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;
const routeAlias = `/${config.routeName}/patients`;

exports.routesConfig = function (app) {
  app.post(routeAlias, [
    PatientsController.insert,
  ]);

  app.get(routeAlias, [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(PAID),
    PatientsController.list,
  ]);

  app.get('/patients/:patientId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySamePatientOrAdminCanDoThisAction,
    PatientsController.getById,
  ]);

  app.patch('/patients/:patientId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySamePatientOrAdminCanDoThisAction,
    PatientsController.patchById,
  ]);

  app.delete('/patients/:patientId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
    PatientsController.removeById,
  ]);
};
