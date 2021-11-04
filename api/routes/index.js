var express = require('express');
var router = express.Router();

const userRouter = require('./users');
/* GET home page. */

router.use('/user', userRouter);


router.get('/', function(req, res, next) {
  res.json('TEST')
});

module.exports = router;
