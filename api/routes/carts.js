const {
  
  ADD_ITEM,
  DELETE_ITEM,
  DELETE_CART,
} = require("../controllers/cartController");
const CartItem = require("../db/Models/Cart_items");
const authenticate = require("../middlewares/auth");
const router = require("express").Router();

router.post("/:id", authenticate, ADD_ITEM);
router.delete("/:id", authenticate, DELETE_CART);
router.delete("/item/:id", authenticate, DELETE_ITEM);


module.exports = router;
