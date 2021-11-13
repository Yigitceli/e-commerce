const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const data = await jwt.verify(token, process.env.TOKEN_SECRET);
  const { iat, exp, ...user } = data;
  req.user = user;
  next();
};
module.exports = authenticateToken;
