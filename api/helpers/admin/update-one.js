const validateUpdateDTO = async (req) => {
  const { validateSchema, validateIsUnique } = sails.helpers.shared;
  let payload = req.body;
  payload.id = req.param('id');
  const { errors, data } = await validateSchema.with({
    collectionName: 'admin',
    schemaName: 'updateDTO',
    data: payload,
    skipMissingProperties: true,
    validators: {
      email: [validateIsUnique],
      username: [validateIsUnique],
    },
  });
  return { errors, data };
};
module.exports = {
  friendlyName: 'Update',

  description: 'Update admin.',

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
    const { errors, data } = await validateUpdateDTO(inputs.req);
    if (!_.isEmpty(errors)) {
      return exits.success({ errors });
    }
    const { id, ...values } = data;
    const record = await Admin.updateOne({ id }).set(values);
    // update search Index
    await sails.helpers.shared.updateSearchIndex.with({
      record,
      collection: 'admin',
    });
    return exits.success({ data: record });
  },
};
