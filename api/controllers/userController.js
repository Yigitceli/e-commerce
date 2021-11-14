var jwt = require("jsonwebtoken");
const User = require("../db/Models/User");
const bcrypt = require("bcrypt");
const Color = require("../db/Models/Color");
const nodemailer = require("nodemailer");
require("dotenv").config();

var transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b1a27442f50334",
    pass: "579230d916c42b",
  },
});

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&.,-_*]).{8,}$/;
  return re.test(password);
}

let refreshTokens = [];

const generateAccessToken = async (user) => {
  const token = await jwt.sign(user, process.env.TOKEN_SECRET, {
    expiresIn: "10m",
  });
  return token;
};

/******************* LOGIN SECTION STARTS ****************/

const LOGIN = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    !email &&
      !password &&
      res.json({
        msg: "Invalid Input",
        success: false,
      });
    const user = await User.query().select("*").where("email", email).first();
    !user &&
      res.status(402).json({
        msg: "Wrong email or password!",
        success: false,
      });

    !user.checked &&
      res.status(402).json({
        msg: "Please verify your email!",
        success: false,
      });

    const userPassword = bcrypt.compareSync(user.password, password);

    !userPassword === password &&
      res.status(402).json({
        msg: "Wrong email or password!",
        success: false,
      });

    const info = Object.fromEntries(
      Object.entries(user).filter(([key]) => !key.includes("password"))
    );

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
    res.status(200).json({ ...info, accessToken, refreshToken, success: true });
  } catch (error) {
    next(error);
  }
};

/******************* LOGOUT SECTION STARTS ****************/

const LOGOUT = (req, res, next) => {
  const token = req.headers.x_access_token;
  try {
    refreshTokens.filter((item) => item !== token);
    res.status(200).json({ msg: "Logout successfull", success: true });
  } catch (error) {
    next(error);
  }
};

/******************* TOKEN SECTION STARTS ****************/

const TOKEN = async (req, res, next) => {
  const { refreshToken } = req.body;
  !refreshToken &&
    res.status(403).json({ msg: "Missing refresh token.", succes: false });
  try {
    !refreshTokens.includes(refreshToken) &&
      res
        .status(402)
        .json({ msg: "Unauthorized refresh token.", success: false });

    const data = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    !data &&
      res
        .status(402)
        .json({ msg: "Unauthorized refresh token.", success: false });
    const { iat, exp, ...user } = data;
    const accessToken = await generateAccessToken(user);
    res.status(200).json({ refreshToken, accessToken, success: true });
  } catch (error) {
    next(error);
  }
};

/******************* REGISTER SECTION STARTS ****************/

const REGISTER = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    let errors = [];

    (!first_name || !last_name || !email || !password) &&
      errors.push("Invalid Inputs");

    const user =
      errors.length <= 0
        ? await User.query().select("*").where({ email }).first()
        : null;

    user && errors.push("Email is already taken!");

    email && !validateEmail(email) && errors.push("Invalid Email input!");

    password &&
      !validatePassword(password) &&
      errors.push(
        "password must be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
      );

    if (errors.length === 0) {
      const data = {
        first_name,
        last_name,
        email,
        password: bcrypt.hashSync(password, 10),
        checked: false,
      };
      const newUser = await User.query().insert(data);
      console.log(newUser);
      const message = {
        from: "shopliyfy@gmail.com",
        to: email,
        subject: "Verify Email",
        html: `Press <a href=http://localhost:5000/api/user/verify/${newUser.id}>Here</a>. Thank you.`,
      };
      transporter.sendMail(message, (err, info) => {
        err && console.log(err);
        info && console.log(info);
      });

      res
        .status(200)
        .json({ msg: "Verification email has been sent!", success: true });
    } else {
      res.status(406).json({ msg: errors, success: false });
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

/******************* VERIFY SECTION STARTS ****************/

const VERIFY = async (req, res, next) => {
  const { id } = req.params;
  try {
    await User.query().findById(id).patch({ checked: true });
    res.status(200).send("You have verifired your email!");
  } catch (error) {}
};

module.exports = { LOGIN, LOGOUT, TOKEN, REGISTER, VERIFY };
