var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const { LOGIN, LOGOUT, TOKEN } = require("../controllers/userController");
const User = require("../db/Models/User");
const authenticateToken = require("../middlewares/auth");
require("dotenv").config();

/* GET users listing. */

router.get("/logout", LOGOUT);
router.get("/test", authenticateToken);

router.post("/login", LOGIN);
router.post("/token", TOKEN);

module.exports = router;
