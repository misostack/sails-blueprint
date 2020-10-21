const config = {
  ALLOW_URLS: ['http://localhost:1337', 'http://localhost:4200'],

  REDIS: {
    SESSION_URL: 'redis://localhost:6379/0',
    SOCKET_URL: 'redis://localhost:6379/1',
    JOBQUEUE_URL: 'redis://localhost:6379/2',
  },

  LOG_LEVEL: 'verbose',

  // SERVICES
  MAILJET: {
    CONFIGS: {
      MJ_APIKEY_PUBLIC: '9d98a6aede3e126935c08844cc6d4492',
      MJ_APIKEY_PRIVATE: 'eacc074b3ac267856761c65648423c96',
      SENDER_ADDRESS: 'son.nguyen@dirox.net',
      SENDER_NAME: 'ReachAt Devs',
      VERSION: 'v3.1',
    },
    MAILJET_EMAIL_ENABLED: false,
  },
  FACEBOOK_API: {
    URL: 'https://graph.facebook.com',
    VERSION: 'v7.0',
  },
  GOOGLE_API: {
    CLIENT_ID:
      '191657712908-glguskonvi7sdkrvs06o5pnp85c1fc3k.apps.googleusercontent.com',
  },
  CUSTOM: {
    baseUrl: 'http://localhost:1337',
    adminAppUrl: 'http://localhost:4200',
    LOG_LEVEL: 'development',
  },
  FIREBASE: {
    SERVICE_ACCOUNT: '../../../firebase-adminsdk.json',
    DATABASE_URL: 'https://reachat-local.firebaseio.com',
  },
};

module.exports = {
  datastores: {
    default: {
      adapter: 'sails-mongo',
      url: 'mongodb://root@localhost/todolist',
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
      allowOrigins: config.ALLOW_URLS,
    },
  },

  session: {
    adapter: '@sailshq/connect-redis',
    url: config.REDIS.SESSION_URL,
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

  custom: {
    baseUrl: config.CUSTOM.baseUrl,
    adminAppUrl: config.CUSTOM.adminAppUrl,
    JOB_QUEUE: {
      JOBQUEUE_REDIS_URL: config.REDIS.JOBQUEUE_URL,
    },
    MAILJET: config.MAILJET,
    FACEBOOK_API: config.FACEBOOK_API,
    GOOGLE_API: config.GOOGLE_API,
    FIREBASE: config.FIREBASE,
  },
};
