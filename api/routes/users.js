var express = require("express");
var router = express.Router();
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
const authenticate = require("../middlewares/auth");
require("dotenv").config();

/* GET users listing. */

router.get("/logout", LOGOUT);
router.get("/get_users", authenticate, GET_ALL_USERS);
router.get("/verify/:id", VERIFY);
router.post("/login", LOGIN);
router.post("/register", REGISTER);
router.post("/token", TOKEN);
router.put('/:id', authenticate, UPDATE_USER);
router.delete('/:id', authenticate, DELETE_USER)

module.exports = router;
