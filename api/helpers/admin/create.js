const validateCreateDTO = async (req) => {
  const { validateSchema, validateIsUnique } = sails.helpers.shared;
  let payload = req.body;
  const { errors, data } = await validateSchema.with({
    collectionName: 'admin',
    schemaName: 'createDTO',
    data: payload,
    validators: {
      email: [validateIsUnique],
      username: [validateIsUnique],
    },
  });
  return { errors, data };
};
module.exports = {
  friendlyName: 'Create',

  description: 'Create admin.',

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
    // TODO
    const { errors, data } = await validateCreateDTO(inputs.req);
    if (!_.isEmpty(errors)) {
      return exits.success({ errors, code: 400 });
    }
    const record = await Admin.create(data).fetch();
    // update search Index
    await sails.helpers.shared.updateSearchIndex.with({
      record,
      collection: 'admin',
    });
    return exits.success({ data: record });
  },
};
