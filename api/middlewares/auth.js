const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  try {
    if (!token) {
      return res.status(406).json({ msg: "Missing token!", success: false });
    }

    try {
      var data = await jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (error) {
      return res.status(402).json({ msg: "Unauthorized access!", success: false });
    }

    const { iat, exp, ...user } = data;
    req.user = user;
    next();
  } catch (error) {
    return res.sendStatus(500);
  }
};
module.exports = authenticateToken;
