const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const { token } = req.cookies;
  !token && res.sendStatus(401);
  jwt.verify(token, process.env.SECRET, (err, res) => {
    req.user = res;
    next();
  });
};

module.exports = authenticateToken;
