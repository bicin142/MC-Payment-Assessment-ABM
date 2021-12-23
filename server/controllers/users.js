const { comparePassword } = require("../helpers/bcrypt");
const { signToken, verifyToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const { User } = require("../models");

const userCreate = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const newUser = await User.create({ email, password });
    res.status(201).json({ message: "New admin has been created as below.", id: newUser.id, email: newUser.email });
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email) throw { name: "BadRequest", message: "Please input email to login"}
    if (!password) throw { name: "BadRequest" , message: "Please input password to login"}
    const foundUser = await User.findOne({ where: { email } });
    if (!foundUser) throw { name: "InvalidLogin" }
    let isValidPassword = comparePassword(password, foundUser.password);
    if (!isValidPassword) throw { name: "InvalidLogin" };
    let access_token = signToken({ email: foundUser.email, id: foundUser.id });
    res.status(200).json({ message: "Login success", access_token, email: foundUser.email });
  } catch (error) {
    next(error);
  }
};

const getToken = async (req, res, next) => {
  const { access_token } = req.headers;
  try {
    const verifiedUser = verifyToken(access_token);
    const validUser = await User.findOne({ where: { email: verifiedUser.email } });
    if (!validUser) throw { name: "InvalidLogin" };
    res.status(200).json({ message: "Token is valid." });
    next();
  } catch (error) {
    next(error);
  }
};

const googleSignIn = async (req, res, next) => {
  const { google_token } = req.body;
  try {
    client_id = process.env.GOOGLE_CLIENT_ID;
    const client = new OAuth2Client(client_id);
    const ticket = await client.verifyIdToken({ idToken: google_token, audience: client_id });
    const payload = ticket.getPayload();
    const { email } = payload;
    const [user, isCreated] = await User.findOrCreate({
      where: { email },
      defaults: {
        password: "aksdbalsvhbasoiyb",
      },
    });
    let access_token = signToken({ email: user.email, id: user.id });
    if (isCreated) {res.status(201).json({ message: "New user created and login with Google success.", access_token, email: user.email })}
    res.status(200).json({ message: "Login with Google success.", access_token, email: user.email });
  } catch (error) {
    next(error);
  }
};

module.exports = { userCreate, userLogin, getToken, googleSignIn };
