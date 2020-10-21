module.exports = {
  friendlyName: 'Find',

  description: 'Find admin.',

  inputs: {
    req: {
      type: 'ref',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs, exits) {
    const { req } = inputs;
    const id = req.param('id');
    const record = await Admin.findOne({ id });

    return exits.success({ data: record });
  },
};
