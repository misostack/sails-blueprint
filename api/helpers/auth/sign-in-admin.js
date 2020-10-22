const validateSignInAdmin = async (req) => {
  let payload = req.body;
  const { validateSchema } = sails.helpers.shared;
  const { errors, data } = await validateSchema.with({
    collectionName: 'admin',
    schemaName: 'signInAdmin',
    data: payload,
  });
  if (errors) {
    return {
      errors,
      data,
    };
  }
  // generic validations
  const admin = await Admin.findOne({
    email: data.email,
  });
  if (!admin) {
    return {
      errorCode: 401,
      message: 'errors_admin_auth_signin_bad_credentials',
    };
  }
  // compare
  const isPasswordMatch = await Admin.comparePassword(
    data.password,
    admin.password,
  );
  if (!isPasswordMatch) {
    return {
      errorCode: 401,
      message: 'errors_admin_auth_signin_bad_credentials',
    };
  }
  return {
    admin,
  };
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
    const { errors, errorCode, message, admin } = await validateSignInAdmin(
      inputs.req,
    );
    if (errorCode) {
      return exits.success({ errors, code: errorCode, message });
    }
    // const record = await Admin.create(data).fetch();

    return exits.success({ data: admin });
  },
};
