var jwt = require("jsonwebtoken");
const User = require("../db/Models/User");
require("dotenv").config();

let refreshTokens = [];

const generateAccessToken = (user) => {
  const token = jwt.sign(user, process.env.SECRET, { expiresIn: "10s" });

  return token;
};

/******************* LOGIN SECTION STARTS ****************/

const LOGIN = async (req, res) => {
  try {
    let { username, passwordBody } = req.body;

    (!username || !passwordBody) &&
      res.status(402).json({
        message: "Invalid input.",
        succes: false,
      });

    const user = await User.query()
      .select()
      .where("username", username)
      .first();

    !user &&
      res.status(404).json({
        message: "There is no user with this username.",
        succes: false,
      });

    user.password !== passwordBody &&
      res.status(401).json({
        message: "Wrong Password.",
        succes: false,
      });

    const { password, ...info } = user;

    const accessToken = generateAccessToken(info);

    const refreshToken = jwt.sign(info, process.env.REFRESH_SECRET, {
      expiresIn: "1y",
    });
    refreshTokens.push(refreshToken);

    res.cookie("token", accessToken, { httpOnly: true });
    res.json({ ...info, accessToken, refreshToken });
  } catch (error) {
    res.status(500).send("Something went broke.");
  }
};

/******************* LOGOUT SECTION STARTS ****************/

const LOGOUT = (req, res) => {
  const { refresh_token } = req.cookies;

  refreshTokens.filter((item) => item !== refresh_token);
  res.cookie("refresh_token", "");
  res.cookie("token", "");
  res.sendStatus(200);
};

/******************* TOKEN SECTION STARTS ****************/

const TOKEN = async (req, res, next) => {
  const { refresh_token } = req.cookies;

  !refresh_token && res.sendStatus(401);
  !refreshTokens.includes(refresh_token) && res.sendStatus(401);
  try {
    const user = await jwt.verify(refresh_token, process.env.REFRESH_SECRET);
    const { iat, exp, ...info } = user;
    const token = generateAccessToken(info);
    res.cookie("token", token, { httpOnly: true });
    res.sendStatus(200);
  } catch (error) {
    res.send("Something went broke!");
  }
};

module.exports = { LOGIN, LOGOUT, TOKEN };
