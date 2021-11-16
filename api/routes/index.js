var express = require("express");
var router = express.Router();

const userRouter = require("./users");
const productRouter = require("./products");
/* GET home page. */

router.use("/user", userRouter);
router.use("/product", productRouter);

router.get("/", function (req, res, next) {
  res.json("TEST");
});

module.exports = router;
