class CustomError extends Error {
  constructor(...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.name = params.name;
    this.code = params.code;
  }
}

module.exports = {
  friendlyName: 'Custom error',

  description: '',
  sync: true,
  inputs: {
    name: {
      type: 'string',
      required: true,
    },
    code: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: function (inputs, exits) {
    // TODO
    const { name, code } = inputs;

    return exits.success(new CustomError(name, code));
  },
};
