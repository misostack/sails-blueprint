const config = {
  ALLOW_URLS: '{ALLOW_URLS}'.split(','),
  DB_URL: '{DB_URL}',
  REDIS_SESSION_URL: '{REDIS_SESSION_URL}',
  REDIS_SOCKET_URL: '{REDIS_SOCKET_URL}',
  REDIS_JOBQUEUE_URL: '{REDIS_JOBQUEUE_URL}',
  LOG_LEVEL: '{LOG_LEVEL}',
  CUSTOM: {
    BASE_URL: '{BASE_URL}',
    WEB_APP_URL: '{WEB_APP_URL}',
    MAILJET: {
      apiKey: '{MAILJET_AK}',
      apiSecret: '{MAILJET_AS}',
      version: '{MAILJET_VERSION}',
      email: '{MAILJET_EMAIL}',
      name: '{MAILJET_NAME}',
    },
    PORT: { PORT },
  }, // end CUSTOM
};

module.exports = {
  port: config.PORT,
  datastores: {
    default: {
      adapter: 'sails-mongo',
      url: config.DB_URL,
    },
  },

  models: {
    migrate: 'safe',
  },

  blueprints: {
    shortcuts: false,
  },

  security: {
    cors: {
      allRoutes: true,
      allowRequestHeaders:
        'Content-Type, Access-Control-Allow-Origin,Authorization',
      allowOrigins: '*',
    },
  },

  session: {
    adapter: '@sailshq/connect-redis',
    url: config.REDIS_SESSION_URL,
    cookie: {
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  },

  sockets: {
    onlyAllowOrigins: config.ALLOW_URLS,
    adapter: '@sailshq/socket.io-redis',
    url: config.REDIS_SOCKET_URL,
  },

  log: {
    level: config.LOG_LEVEL,
  },

  http: {
    cache: 365.25 * 24 * 60 * 60 * 1000, // One year
    trustProxy: true,
  },

  custom: config.CUSTOM,
};
