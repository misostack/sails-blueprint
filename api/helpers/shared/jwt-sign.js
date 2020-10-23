const jsonwebtoken = require('jsonwebtoken');
const uuid = require('uuid');

module.exports = {
  friendlyName: 'Jwt',

  description: 'Jwt shared.',

  inputs: {
    payload: {
      type: 'ref',
      required: true,
    },
    expiresIn: {
      type: 'ref',
      required: false,
      defaultsTo: 3600, // 3600s
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    const { payload, expiresIn } = inputs;
    const secret = sails.config.custom.TOKENS.SECRET;
    const jwtid = uuid.v4();
    const signOptions = {
      algorithm: 'HS256',
      expiresIn,
      issuer: sails.config.custom.baseUrl,
      jwtid: jwtid,
    };
    return {
      jwtid: jwtid,
      token: jsonwebtoken.sign(payload, secret, signOptions),
      expiresIn,
    };
  },
};
