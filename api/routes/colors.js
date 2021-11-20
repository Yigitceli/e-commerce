const { ADD_COLOR, DELETE_COLOR, GET_COLORS } = require("../controllers/colorController");
const authenticate = require("../middlewares/auth");

const router = require("express").Router();

router.post("/", authenticate, ADD_COLOR);
router.get("/", authenticate, GET_COLORS);
router.delete("/:id", authenticate, DELETE_COLOR);


module.exports = router;
