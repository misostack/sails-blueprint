/**
 * AvailabilityController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const callActions = async (req, res, action) => {
  try {
    //     req.i18n.reloadResources();
    const { data, errors } = await sails.helpers.admin[`${action}`](req);
    if (errors) {
      return res.badRequest({ errors });
    }
    if (action === 'create') {
      return res.createSuccess({ data });
    }
    // default
    return res.success({ data });
  } catch (error) {
    return res.internalServerError(error);
  }
};
module.exports = {
  create: async function (req, res) {
    return callActions(req, res, 'create');
  },

  findOne: async function (req, res) {
    return callActions(req, res, 'findOne');
  },

  updateOne: async function (req, res) {
    return callActions(req, res, 'updateOne');
  },

  destroyOne: async function (req, res) {
    return callActions(req, res, 'destroyOne');
  },

  find: async function (req, res) {
    return callActions(req, res, 'find');
  },
};
