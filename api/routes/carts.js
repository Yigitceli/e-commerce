const {
  ADD_ITEM,
  DELETE_ITEM,
  DELETE_CART,
  UPDATE_ITEM,
} = require("../controllers/cartController");

const authenticate = require("../middlewares/auth");
const router = require("express").Router();

router.post("/:id", authenticate, ADD_ITEM);
router.delete("/:id", authenticate, DELETE_CART);
router.delete("/item/:id", authenticate, DELETE_ITEM);
router.put("/:id", authenticate, UPDATE_ITEM);

module.exports = router;
