/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  '*': ['detectLanguage'],
  'Admin/*': ['detectLanguage', 'authGuard'],
  // 'Admin/create': ,
  'Admin/findOne': ['adminResolver'],
  'Admin/updateOne': ['adminResolver'],
  'Admin/destroyOne': ['adminResolver'],
  // 'Admin/find':,
};
