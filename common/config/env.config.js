module.exports = {
  port: process.env.PORT || 3600,
  appEndpoint: 'http://localhost:3600',
  apiEndpoint: 'http://localhost:3600',
  routeName: 'api',
  jwt_secret: 'myS33!!creeeT',
  jwt_expiration_in_seconds: 36000,
  environment: 'dev',
  permissionLevels: {
    NORMAL_USER: 1,
    PAID_USER: 4,
    ADMIN: 2048,
  },
};
