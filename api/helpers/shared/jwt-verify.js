const jsonwebtoken = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Jwt',

  description: 'Jwt verify.',

  inputs: {
    token: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    const { token } = inputs;
    const secret = sails.config.custom.TOKENS.SECRET;
    return jsonwebtoken.verify(token, secret, {
      complete: false,
    });
  },
};
