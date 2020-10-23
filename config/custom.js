/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {
  baseUrl: 'http://localhost:1337',
  adminAppUrl: 'http://localhost:4200',
  LOG_LEVEL: 'production',
  SALT_WORK_FACTOR: 10,
  TOKENS: {
    // secret
    SECRET: 'TqXFCKZWbnYkBUP4/rBv1Fd3e+OVScQBZDav2mXSMw4=',
    // short live
    EXPIRES: {
      ACCESS: '1h', // 1 hours
      RESET_PASSWORD: 5 * 1000, // 5 mins
      REFRESH: '7d',
    },
  },
};
