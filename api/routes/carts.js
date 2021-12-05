const {
  ADD_ITEM,
  DELETE_ITEM,
  DELETE_CART,
  UPDATE_ITEM,
  GET_ITEMS,
} = require("../controllers/cartController");
const { where } = require("../db/db");
const Cart = require("../db/Models/Cart");
const CartItem = require("../db/Models/Cart_items");
const Color = require("../db/Models/Color");
const Product = require("../db/Models/Product");

const authenticate = require("../middlewares/auth");
const router = require("express").Router();

router.post("/:id", authenticate, ADD_ITEM);
router.delete("/", authenticate, DELETE_CART);
router.delete("/item/:id", authenticate, DELETE_ITEM);
router.put("/:id", authenticate, UPDATE_ITEM);
router.get("/", authenticate, GET_ITEMS);

module.exports = router;
