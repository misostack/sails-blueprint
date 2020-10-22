const Joi = require('joi');
const util = require('util');
const validateField = (model, data, field, value, validators) => {
  const { customError } = sails.helpers.shared;
  return new Promise(async (resolve) => {
    try {
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
            resolve(error);
          }
        }
      }
      // if there is no error resolve
      resolve(false);
    } catch (error) {
      throw new Error(util.inspect(error, true, 5));
    }
  });
};

const ERROR_MAPPING = {
  // required: 'e_required',
  // min: 'e_minlength',
  // max: 'e_maxlength',
};
const errorFilter = (s) => {
  return s.replace(/string.|any.|number./gi, (x) => {
    return '';
  });
};
const transformError = (collectionName, { message, path, type, context }) => {
  const field = path.join('_');
  const code = ERROR_MAPPING[errorFilter(type)] || errorFilter(type);
  return {
    field,
    type,
    code: _.toLower(`${collectionName}_${field}_e_${code}`),
    context,
  };
};

module.exports = {
  friendlyName: 'Validate schema',

  description: '',

  inputs: {
    data: {
      type: 'ref',
      required: true,
    },
    collectionName: {
      type: 'string',
      required: true,
    },
    schemaName: {
      type: 'string',
      required: true,
    },
    validators: {
      type: 'ref',
      required: false,
      defaultsTo: false,
    },
    skipMissingProperties: {
      type: 'boolean',
      required: false,
      defaultsTo: false,
    },
    omits: {
      type: 'ref',
      required: false,
      defaultsTo: ['id'],
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    let {
      data,
      collectionName,
      schemaName,
      validators,
      skipMissingProperties,
      omits,
    } = inputs;
    const collection = sails.models[collectionName];
    const schema = collection[schemaName];
    const dataKeys = _.keys(data || {});
    let fieldsToValidate = schema.fields;
    let omitFields = [];
    if (skipMissingProperties) {
      fieldsToValidate = _.pick(fieldsToValidate, dataKeys);
    }
    if (omits) {
      omitFields = _.pick(data, omits);
      data = _.omit(data, omits);
    }
    const { error, value } = Joi.object(fieldsToValidate).validate(data, {
      abortEarly: false,
    });
    const fieldErrors = error
      ? error.details.map((e) => transformError(collectionName, e))
      : [];
    const errorFields = _.isEmpty(fieldErrors)
      ? []
      : _.clone(fieldErrors).map((e) => e.field);
    let validateAttributes = _.keys(fieldsToValidate)
      .filter((field) => !errorFields.includes(field))
      .filter((field) => _.keys(validators).includes(field))
      .map((field) =>
        validateField(
          collection,
          { ...data, ...omitFields },
          field,
          data[field] || '',
          validators,
        ),
      );
    const customErrors = await Promise.all(validateAttributes);

    let errors = _.concat(
      fieldErrors,
      customErrors.filter((e) => e !== false),
    );

    return {
      errors: errors.length > 0 ? errors : false,
      data: { ...omitFields, ...value },
    };
  },
};
