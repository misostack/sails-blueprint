module.exports = async function (req, res, proceed) {
  const id = req.param('id');
  const record = await Admin.findOne({ id });
  if (!record) {
    return res.notFound();
  }
  return proceed();
};
