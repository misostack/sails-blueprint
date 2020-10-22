/**
 * badRequest.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.badRequest();
 *     // -or-
 *     return res.badRequest(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'badRequest'
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

module.exports = function badRequest(optionalData) {
  // Get access to `req` and `res`
  const req = this.req;
  const res = this.res;

  // Define the status code to send in the response.
  const statusCodeToSet = 400;
  const responseData = {
    message: req.t('errors_bad_request'),
    status: statusCodeToSet,
  };

  if (optionalData === undefined) {
    return res.status(statusCodeToSet).send(responseData);
  } else if (_.isError(optionalData)) {
    throw optionalData;
  } else {
    responseData['errors'] = [];
    responseData.message = req.t(optionalData.message) || responseData.message;
    for (let i in optionalData.errors || []) {
      let error = optionalData.errors[i];
      responseData['errors'].push({
        message: req.t(`errors_validations_${error.code}`),
        ...error,
      });
    }
    return res.status(statusCodeToSet).send(responseData);
  }
};
