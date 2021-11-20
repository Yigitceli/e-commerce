var express = require("express");
var router = express.Router();

const userRouter = require("./users");
const productRouter = require("./products");
const colorRouter = require("./colors");
const sizeRouter = require('./sizes');
/* GET home page. */

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/color", colorRouter);
router.use('/size', sizeRouter)

router.get("/", function (req, res, next) {
  res.json("TEST");
});

module.exports = router;
