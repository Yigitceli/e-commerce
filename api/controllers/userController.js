var jwt = require("jsonwebtoken");
const { token } = require("morgan");
const User = require("../db/Models/User");
require("dotenv").config();

let refreshTokens = [];

const generateAccessToken = (user) => {
 

};

/******************* LOGIN SECTION STARTS ****************/

const LOGIN = async (req, res) => {
  const { email, passwordData } = req.body;
  try {
    !(email && !passwordData) &&
      res.json({
        msg: "Invalid Input",
        success: false,
      });
    const user = await User.query().select("*").where("email", email).first();
    !user &&
      res.json({
        msg: "Wrong email or password!",
        success: false,
      });
    !user.password === passwordData &&
      res.json({
        msg: "Wrong email or password!",
        success: false,
      });

    const { password, ...info } = user;

    const refreshToken = await jwt.sign(
      info,
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "20d",
      }
    );

    const accessToken = await jwt.sign(info, process.env.TOKEN_SECRET, {
      expiresIn: "15m",
    });
    refreshTokens.push(refreshToken);
    res.json({ ...info, accessToken, refreshToken, success: true });
  } catch (error) {
    next(error);
  }
};

/******************* LOGOUT SECTION STARTS ****************/

const LOGOUT = (req, res) => {
  const token = req.headers.x_access_token;
  try {
    refreshTokens.filter((item) => item !== token);
    res.json({ msg: "Logout successfull", success: true });
  } catch (error) {
    next(error);
  }
};

/******************* TOKEN SECTION STARTS ****************/

const TOKEN = async (req, res, next) => {};

module.exports = { LOGIN, LOGOUT, TOKEN };
