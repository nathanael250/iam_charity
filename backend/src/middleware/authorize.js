const authorize = () => (_req, _res, next) => {
  next();
};

module.exports = authorize;
