/**
 * createSuccess.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.createSuccess();
 *     // -or-
 *     return res.createSuccess(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'createSuccess'
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

module.exports = function createSuccess(optionalData) {
  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 201;

  // If no data was provided, use res.sendStatus().
  if (optionalData === undefined) {
    sails.log.info('Ran custom response: res.createSuccess()');
    return res.sendStatus(statusCodeToSet);
  }
  // Else if the provided data is an Error instance, if it has
  // a toJSON() function, then always run it and use it as the
  // response body to send.  Otherwise, send down its `.stack`,
  // except in production use res.sendStatus().
  else if (_.isError(optionalData)) {
    sails.log.info(
      'Custom response `res.createSuccess()` called with an Error:',
      optionalData,
    );

    // If the error doesn't have a custom .toJSON(), use its `stack` instead--
    // otherwise res.json() would turn it into an empty dictionary.
    // (If this is production, don't send a response body at all.)
    if (!_.isFunction(optionalData.toJSON)) {
      if (process.env.NODE_ENV === 'production') {
        return res.sendStatus(statusCodeToSet);
      } else {
        return res.status(statusCodeToSet).send(optionalData.stack);
      }
    }
  }
  // Set status code and send response data.
  else {
    const { message, data } = optionalData;
    return res.status(statusCodeToSet).send({
      message: req.t(message || 'messages.success'),
      status: statusCodeToSet,
      data,
    });
  }
};
