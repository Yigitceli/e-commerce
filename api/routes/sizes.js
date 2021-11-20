const {
  GET_SIZES,
  ADD_SIZE,
  DELETE_SIZE,
} = require("../controllers/sizeController");
const authenticate = require("../middlewares/auth");

const router = require("express").Router();

router.get("/", authenticate, GET_SIZES);
router.post("/", authenticate, ADD_SIZE);
router.delete("/:id", authenticate, DELETE_SIZE);

module.exports = router;
