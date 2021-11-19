const { ADD_COLOR, DELETE_COLOR } = require("../controllers/colorController");
const authenticate = require("../middlewares/auth");

const router = require("express").Router();

router.post("/", authenticate, ADD_COLOR);
router.get("/", DELETE_COLOR);

module.exports = router;
