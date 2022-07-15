const jwt = require("jsonwebtoken");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(StatusCodes.FORBIDDEN).json({
        message: ReasonPhrases.FORBIDDEN,
        data: "Access Token required for Authorization",
      });
  }
  try {
    const decoded = jwt.verify(token, "my_secret_key");
    req.user = decoded;
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
        message: ReasonPhrases.UNAUTHORIZED,
        data: "Token invalid or expired",
      });
  }
  return next();
};

module.exports = verifyToken;