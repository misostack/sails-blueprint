module.exports = {
  friendlyName: 'List',

  description: 'List admin.',

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
    const { modelList } = sails.helpers.shared;
    const data = await modelList.with({ model: Admin, req: inputs.req });
    return exits.success({ data });
  },
};
