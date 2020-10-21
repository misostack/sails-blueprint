const validateCreateDTO = async (req) => {
  const { validate, validateIsUnique } = sails.helpers.shared;
  let data = req.body;
  const errors = await validate.with({
    data,
    model: Admin,
    // fields: [] : fields to validate - leave empty to allow validate all
    // omit: ['id'] : fields to be ignore from user input
    validators: {
      email: [validateIsUnique],
      username: [validateIsUnique],
    },
  });
  // transform payload in case needed
  return { data, errors };
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
      return exits.success({ errors });
    }
    const record = await Admin.create(data).fetch();
    return exits.success({ data: record });
  },
};
