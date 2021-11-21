const {
  CREATE_CART,
  ADD_ITEM,
  DELETE_ITEM,
  DELETE_CART,
} = require("../controllers/cartController");
const authenticate = require("../middlewares/auth");
const router = require("express").Router();

router.post("/", authenticate, CREATE_CART);
router.post("/:id", authenticate, ADD_ITEM);
router.delete("/:id", authenticate, DELETE_CART);
router.delete("/item/:id", authenticate, DELETE_ITEM);

module.exports = router;
