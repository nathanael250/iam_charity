const authOptional = (req, _res, next) => {
  req.user = req.user || null;
  next();
};

module.exports = authOptional;
