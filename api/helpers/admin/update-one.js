const validateCreateDTO = async (req) => {
  const { validate, validateIsUnique } = sails.helpers.shared;
  let data = req.body;
  data.id = req.param('id');
  const errors = await validate.with({
    data,
    model: Admin,
    fields: _.keys(data), //: fields to validate - leave empty to allow validate all
    omit: [], //: fields to be ignore from user input
    validators: {
      email: [validateIsUnique],
      username: [validateIsUnique],
    },
  });
  // transform payload in case needed
  return { data, errors };
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
    const { errors, data } = await validateCreateDTO(inputs.req);
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
