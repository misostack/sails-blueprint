const util = require('util');
const validateField = (model, data, field, value, validators) => {
  return new Promise(async (resolve) => {
    try {
      // const a = model.validate(field, value);
      const transFormValue = model.validate(field, value);
      const fieldValidators = _.get(validators, field, false);
      if (fieldValidators && fieldValidators.length > 0) {
        for (let validator of fieldValidators) {
          const error = await validator(
            model,
            data,
            field,
            value,
            data.id || '',
          );
          if (error) {
            resolve({
              field: field,
              message: `validations.${model.identity}_${field}_${error.code}`.toLowerCase(),
            });
          }
        }
      }
      // if there is no error resolve
      resolve(false);
    } catch (error) {
      sails.log.error(util.inspect(error, true, 5));
      let errorCode = error.code;
      if (error.code === 'E_VIOLATES_RULES') {
        errorCode = `e_${error.ruleViolations[0].rule}`;
      }
      resolve({
        field: field,
        message: `validations.${model.identity}_${field}_${errorCode}`.toLowerCase(),
      });
    }
  });
};
module.exports = {
  friendlyName: 'Validate',

  description: 'Validate shared.',

  inputs: {
    data: {
      type: 'ref',
      required: true,
    },
    model: {
      type: 'ref',
      required: true,
    },
    fields: {
      type: 'ref',
      required: false,
      defaultsTo: false,
    },
    omit: {
      type: 'ref',
      required: false,
      defaultsTo: ['id'],
    },
    validators: {
      type: 'ref',
      required: false,
      defaultsTo: false,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs, exits) {
    // TODO
    const { model, fields, omit, validators } = inputs;
    const { id, createdAt, updatedAt, ...attributes } = model.attributes;
    // pick data
    const data = _.omit(
      inputs.data,
      _.concat(omit, ['createdAt', 'updatedAt']),
    );

    let validateAttributes = _.keys(attributes)
      .filter((field) => (fields ? fields.includes(field) : true))
      .map((field) =>
        validateField(model, data, field, data[field] || '', validators),
      );
    const errors = await Promise.all(validateAttributes);
    return exits.success(errors.filter((error) => error !== false));
  },
};
