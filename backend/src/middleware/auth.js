const auth = (req, _res, next) => {
  req.user = req.user || null;
  next();
};

module.exports = auth;
