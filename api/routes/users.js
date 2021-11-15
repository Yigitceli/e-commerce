var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const {
  LOGIN,
  LOGOUT,
  TOKEN,
  REGISTER,
  VERIFY,
  GET_ALL_USERS,
  UPDATE_USER,
} = require("../controllers/userController");
const User = require("../db/Models/User");
const authenticateToken = require("../middlewares/auth");
require("dotenv").config();

/* GET users listing. */

router.get("/logout", LOGOUT);
router.get("/get_users", GET_ALL_USERS);
router.get("/verify/:id", VERIFY);
router.post("/login", LOGIN);
router.post("/register", REGISTER);
router.post("/token", TOKEN);
router.put('/:id', UPDATE_USER);

module.exports = router;
