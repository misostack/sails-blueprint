/**
 * AvailabilityController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const callActions = async (req, res, action) => {
  try {
    //     req.i18n.reloadResources();
    const { data, errors } = await sails.helpers.auth[`${action}`](req);
    if (errors) {
      return res.badRequest({ errors });
    }
    // default
    return res.success({ data });
  } catch (error) {
    return res.internalServerError(error);
  }
};
module.exports = {
  signInAdmin: async function (req, res) {
    return callActions(req, res, 'signInAdmin');
  },
};
