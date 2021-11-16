const router = require("express").Router();

router.get("/test", (req, res) => {
  res.json("TEST");
});

module.exports = router;
