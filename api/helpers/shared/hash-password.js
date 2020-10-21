const bcrypt = require('bcrypt');

module.exports = {
  friendlyName: 'Hash password',

  description: '',

  inputs: {
    password: {
      description: 'password',
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
    const { password } = inputs;
    const salt = await bcrypt.genSalt(sails.config.custom.SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  },
};
