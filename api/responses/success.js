/**
 * success.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.success();
 *     // -or-
 *     return res.success(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'success'
 *       }
 *     }
 * ```
 *
 * ```
 *     throw 'somethingHappened';
 *     // -or-
 *     throw { somethingHappened: optionalData }
 * ```
 */

module.exports = function success(optionalData) {
  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 200;

  const { message, data } = optionalData;
  return res.status(statusCodeToSet).send({
    message: req.t(message || 'messages_success'),
    status: statusCodeToSet,
    data,
  });
};
