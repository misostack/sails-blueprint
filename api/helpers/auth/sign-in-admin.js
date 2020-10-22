const validateSignInAdmin = async (req) => {
  let payload = req.body;
  const { errors, data } = await validateSchema.with({
    collectionName: 'admin',
    schemaName: 'signInAdmin',
    data: payload,
    validators: {
      email: [validateIsUnique],
      password: [validateIsUnique],
    },
  });
  return { errors, data, code: 401 };
};

module.exports = {
  friendlyName: 'Sign In Admin',

  description: 'Sign In Admin',

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
    const { errors, data, code } = await validateSignInAdmin(inputs.req);
    if (!_.isEmpty(errors)) {
      return exits.success({ errors, code });
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
