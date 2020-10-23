module.exports = {
  friendlyName: 'Verify token',

  description: '',

  inputs: {
    token: {
      type: 'string',
      required: true,
    },
    scope: {
      type: 'string',
      isIn: ['access', 'reset_password', 'refresh'],
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    const { token, scope } = inputs;
    try {
      const payload = await sails.helpers.shared.jwtVerify.with({ token });
      // check scope
      return payload === scope
        ? { payload }
        : { error: 'errors_forbidden', errorCode: 401 };
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return { error: 'token_expired_error', errorCode: 401 };
      } else if (error.name === 'JsonWebTokenError') {
        return { error: 'jwt_malformed', errorCode: 401 };
      } else {
        return { error: error, errorCode: 500 };
      }
    }
  },
};
