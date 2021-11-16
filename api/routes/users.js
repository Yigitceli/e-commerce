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
  DELETE_USER,
} = require("../controllers/userController");
const User = require("../db/Models/User");
const authenticateToken = require("../middlewares/auth");
require("dotenv").config();

/* GET users listing. */

router.get("/logout", LOGOUT);
router.get("/get_users", authenticateToken, GET_ALL_USERS);
router.get("/verify/:id", VERIFY);
router.post("/login", LOGIN);
router.post("/register", REGISTER);
router.post("/token", TOKEN);
router.put('/:id', authenticateToken, UPDATE_USER);
router.delete('/:id', authenticateToken, DELETE_USER)

module.exports = router;
