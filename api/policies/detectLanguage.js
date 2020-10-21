module.exports = async function (req, res, proceed) {
  const lng = req.language; // 'de-CH'
  req.i18n.changeLanguage(lng);
  return proceed();
};
