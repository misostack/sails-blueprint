module.exports = {
  friendlyName: 'Sign token',

  description: '',

  inputs: {
    uid: {
      type: 'string',
      required: true,
    },
    role: {
      type: 'string',
      isIn: ['user', 'admin'],
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
    // TODO
    const { jwtSign } = sails.helpers.shared;
    const { uid, role, scope } = inputs;
    const payload = {
      uid,
      role,
      scope,
    };
    const expiresIn = sails.config.custom.TOKENS.EXPIRES[_.toUpper(scope)];
    return jwtSign.with({ payload, expiresIn });
  },
};
