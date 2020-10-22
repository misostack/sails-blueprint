const uuid = require('uuid');
const Joi = require('joi');
/**
 * Admin.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  tableName: 'admins',
  primaryKey: 'id',
  dontUseObjectIds: true,
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    username: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      unique: true,
      required: true,
    },
    password: {
      type: 'string',
      required: true,
    },
    status: {
      type: 'string',
      required: false,
      isIn: ['active', 'inactive'],
      defaultsTo: 'active',
    },
    firstName: {
      type: 'string',
      required: true,
    },
    lastName: {
      type: 'string',
      required: true,
    },
    // Search Index
    s: {
      type: 'string',
      required: false,
      defaultsTo: '',
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
  },
  createDTO: {
    fields: {
      username: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
  updateDTO: {
    fields: {
      username: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      status: Joi.string().valid('active', 'inactive'),
    },
  },
  signInAdmin: {
    fields: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
  comparePassword: (candidatePassword, password) => {
    return sails.helpers.shared.hashPasswordCompare.with({
      candidatePassword,
      password,
    });
  },

  beforeCreate: async (valuesToSet, proceed) => {
    valuesToSet.id = uuid.v4();
    valuesToSet.password = await sails.helpers.shared.hashPassword(
      valuesToSet.password,
    );
    return proceed();
  },

  beforeUpdate: async (valuesToSet, proceed) => {
    if (valuesToSet.password) {
      valuesToSet.password = await sails.helpers.shared.hashPassword(
        valuesToSet.password,
      );
      return proceed();
    } else {
      return proceed();
    }
  },

  customToJSON: function () {
    // Return a shallow copy of this record with the password and ssn removed.
    return _.omit(this, ['password', 's']);
  },
};
