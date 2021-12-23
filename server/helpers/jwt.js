const jwt = require("jsonwebtoken");

function signToken(userDetails) {
  let newToken = jwt.sign(userDetails, process.env.JWT_SIGNATURE);
  return newToken;
}

function verifyToken(access_token) {
  let validToken = jwt.verify(access_token, process.env.JWT_SIGNATURE);
  return validToken;
}

module.exports = { signToken, verifyToken };
