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

const firstLetterUpperCase = (str) => {
  const str2 = str.charAt(0).toUpperCase() + str.slice(1);
  return str2;
};

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
  let { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.json({
        msg: "Invalid Input",
        success: false,
      });
    }
    email = email.toLowerCase();

    const user = await User.query().select("*").where("email", email).first();
    if (!user || user.deleted) {
      return res.status(402).json({
        msg: "Wrong email or password!",
        success: false,
      });
    }

    if (!user.checked) {
      return res.status(402).json({
        msg: "Please verify your email!",
        success: false,
      });
    }

    const passwordCheck = bcrypt.compareSync(password, user.password);

    if (!passwordCheck) {
      return res.status(402).json({
        msg: "Wrong email or password!",
        success: false,
      });
    }

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
  const token = req.headers["x-access-token"];
  try {
    if (!token) {
      return res
        .status(406)
        .json({ msg: "Missing refresh token", success: false });
    }
    refreshTokens.filter((item) => item !== token);
    res.status(200).json({ msg: "Logout successfull", success: true });
  } catch (error) {
    next(error);
  }
};

/******************* TOKEN SECTION STARTS ****************/

const TOKEN = async (req, res, next) => {
  const refreshToken = req.headers["x-access-token"];
  try {
    if (!refreshToken) {
      return res
        .status(403)
        .json({ msg: "Missing refresh token.", succes: false });
    }
    if (!refreshTokens.includes(refreshToken)) {
      return res
        .status(402)
        .json({ msg: "Unauthorized refresh token.", success: false });
    }

    let data = null;
    try {
      data = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
      return res
        .status(402)
        .json({ msg: "Unauthorized refresh token.", success: false });
    }

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
    let { first_name, last_name, email, password } = req.body;
    email = email.toLowerCase();
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
    res.status(200).send("You have verified your email!");
  } catch (error) {}
};

/******************* GET_ALL_USERS SECTION STARTS ****************/

const GET_ALL_USERS = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  try {
    if (!token) {
      return res.status(406).json({ msg: "Missing token!", success: false });
    }
    let user = null;

    try {
      user = jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      return res
        .status(402)
        .json({ msg: "Unauthorized Token!", success: false });
    }

    if (!user?.is_admin) {
      return res
        .status(402)
        .json({ msg: "Unauthorized access!", success: false });
    }

    const users = await User.query().select("*");

    users?.length > 0
      ? res.status(200).json({ success: true, payload: users })
      : res.status(500).json({ msg: "Something gone wrong.", success: false });
  } catch (error) {
    res.sendStatus(500);
  }
};

/******************* UPDATE_USER SECTION STARTS ****************/

const UPDATE_USER = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  const { id } = req.params;
  let { email, first_name, last_name, is_admin, deleted, ...rest } = req.body;

  try {
    if (!token) {
      return res
        .status(406)
        .json({ msg: "Missing access token!", success: false });
    }
    let user = null;
    try {
      user = await jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (error) {
      return res
        .status(402)
        .json({ msg: "Invalid access token", success: false });
    }

    if (id != user.id && !user.is_admin) {
      return res
        .status(402)
        .json({ msg: "Unauthorized access!", success: false });
    }

    let userUpdated = null;
    if (req.body) {
      first_name = first_name ? firstLetterUpperCase(first_name) : null;

      last_name = last_name ? firstLetterUpperCase(last_name) : null;

      is_admin = user.is_admin ? is_admin : null;

      deleted = user.is_admin ? deleted : null;

      rest = user.is_admin ? rest : null;

      let data = Object.assign(
        {},
        first_name && { first_name },
        last_name && { last_name },
        is_admin && { is_admin },
        deleted && { deleted },
        email && { email: email.toLowerCase() },
        rest && { ...rest }
      );

      userUpdated =
        Object.keys(data).length != 0
          ? await User.query().patchAndFetchById(id, data)
          : await User.query().findById(id);
      console.log("TEST");
    }

    const { iat, exp, password, ...info } = userUpdated;

    res
      .status(200)
      .json({ msg: "User updated.", payload: info, success: true });
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  LOGIN,
  LOGOUT,
  TOKEN,
  REGISTER,
  VERIFY,
  GET_ALL_USERS,
  UPDATE_USER,
};
