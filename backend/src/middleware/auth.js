const HttpError = require("../utils/httpError");
const { verifyAuthToken } = require("../utils/authToken");

const auth = (req, _res, next) => {
  try {
    const authorization = req.headers.authorization || "";
    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new HttpError(401, "Authentication required");
    }

    req.user = verifyAuthToken(token);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
