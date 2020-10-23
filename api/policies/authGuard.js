module.exports = async function (req, res, proceed) {
  const authorizations = req.headers.authorization.split(' ');
  if (authorizations[0] !== 'Bearer' || authorizations[1].length === 0) {
    return res.unauthorized();
  }
  // verify token
  const { verifyToken } = sails.helpers.auth;
  const { payload, error, errorCode } = await verifyToken.with({
    token: authorizations[1],
    scope: 'access',
  });
  if (error && errorCode === 401) {
    return res.unauthorized({ message: error });
  }
  if (error && errorCode === 403) {
    return res.forbidden({ message: error });
  }
  if (error && errorCode === 500) {
    return res.internalServerError(error);
  }
  req.userContext = payload;
  return proceed();
};
