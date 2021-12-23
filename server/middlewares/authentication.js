const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authenticateUser = async (req, res, next) => {
  const { access_token } = req.headers;
  try {
    const verifiedUser = verifyToken(access_token);
    const validUser = await User.findOne({ where: { email: verifiedUser.email } });
    if (!validUser) throw {name: 'InvalidLogin'}
    req.user = { id: validUser.id, email: validUser.email };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticateUser;
