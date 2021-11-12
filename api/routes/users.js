var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const User = require("../db/Models/User");
require("dotenv").config();

/* GET users listing. */
router.post("/login", async function (req, res, next) {
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
    const token = jwt.sign(info, process.env.SECRET, { expiresIn: "3d" });
    res.cookie("token", token, { maxAge: 900000, httpOnly: true });
    res.json({ ...info, token });
  } catch (error) {}
});

module.exports = router;
