module.exports = {
  friendlyName: 'Destroy',

  description: 'Destroy admin.',

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
    await Admin.destroyOne({ id });

    return exits.success({ data: {} });
  },
};
