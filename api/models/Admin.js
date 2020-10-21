const uuid = require('uuid');
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
      minLength: 3,
      maxLength: 50,
    },
    lastName: {
      type: 'string',
      required: true,
      minLength: 3,
      maxLength: 50,
    },
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
    return _.omit(this, ['password']);
  },
};
