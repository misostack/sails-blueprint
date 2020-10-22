const util = require('util');

module.exports = function internalServerError(optionalData) {
  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 500;

  // If no data was provided, use res.sendStatus().
  if (optionalData === undefined) {
    sails.log.info('Ran custom response: res.internalServerError()');
    return res.sendStatus(statusCodeToSet);
  }
  // Else if the provided data is an Error instance, if it has
  // a toJSON() function, then always run it and use it as the
  // response body to send.  Otherwise, send down its `.stack`,
  // except in production use res.sendStatus().
  else if (_.isError(optionalData)) {
    sails.log.error('[INTERNAL_SERVER_ERROR]', optionalData);
    // If the error doesn't have a custom .toJSON(), use its `stack` instead--
    // otherwise res.json() would turn it into an empty dictionary.
    // (If this is production, don't send a response body at all.)
    if (!_.isFunction(optionalData.toJSON)) {
      if (process.env.NODE_ENV === 'production') {
        return res.status(statusCodeToSet).send({
          message: req.t('errors_internal_server_error'),
          status: statusCodeToSet,
        });
      } else {
        return res.status(statusCodeToSet).send({
          message: req.t('errors_internal_server_error'),
          status: statusCodeToSet,
          stack: util.inspect(optionalData, true, 5),
        });
      }
    }
  }
  // Set status code and send response data.
  else {
    return res.status(statusCodeToSet).send({
      message: req.t('errors_internal_server_error'),
      status: statusCodeToSet,
      ...optionalData,
    });
  }
};
