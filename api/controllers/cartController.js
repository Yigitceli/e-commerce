const { id } = require("../db/Models/Cart");
const Cart = require("../db/Models/Cart");
const CartItem = require("../db/Models/Cart_items");
const User = require("../db/Models/User");





/******************* ADD_ITEM SECTION STARTS ****************/

const ADD_ITEM = async (req, res, next) => {
  const { quantity, color, size } = req.body;
  const user = req.user;
  const { id } = req.params;
  try {
    try {
      var cart = await User.relatedQuery("carts")
        .for(user.id)
        .select("*")
        .where({ deleted: false })
        .first();
      if (!cart) {
        cart = await User.relatedQuery("carts").for(user.id).insertAndFetch({});
      }

      const product = await Cart.relatedQuery("cart_items")
        .for(cart.id)
        .select("*")
        .where({ color, size, product_id: id })
        .first();

      if (product) {
        const quantityToAdd = quantity;
        await CartItem.query()
          .update({ quantity: product.quantity + quantity })
          .where({ cart_id: cart.id, color, size, product_id: id });
      } else {
        await Cart.relatedQuery("cart_items")
          .for(cart.id)
          .relate({ id, quantity, color, size });
      }
    } catch (error) {
      return res.status(406).json({ msg: "Invalid Inputs", success: false });
    }

    const cartItems = await Cart.query().withGraphFetched("cart_items");
    res.json({ msg: "Item Added To Cart", paylod: cartItems, success: false });
  } catch (error) {
    res.status(500).send(error);
  }
};

/******************* DELETE_ITEM SECTION STARTS ****************/

const DELETE_ITEM = async (req, res, next) => {
  const { item } = req.body;
  const { id } = req.params;
  try {
    try {
      var deletedItem = await Cart.relatedQuery("cart_items")
        .for(id)
        .unrelate()
        .where("product_id", item);
    } catch (error) {
      return res.status(406).json({ msg: "Invalid Inputs", success: false });
    }

    const cartItems = await Cart.query().withGraphFetched("cart_items");
    deletedItem == 1
      ? res.json({
          msg: "Item Deleted from Cart",
          paylod: cartItems,
          success: true,
        })
      : res.status(404).json({
          msg: "Item not found",
          success: false,
        });
  } catch (error) {
    res.status(500).send(error);
  }
};

/******************* DELETE_CART SECTION STARTS ****************/

const DELETE_CART = async (req, res, next) => {
  const { id } = req.params;
  try {
    try {
      var cart = await Cart.query().delete().where({ id });
    } catch (error) {
      return res.status(406).json({ msg: "Invalid Inputs", success: false });
    }

    const cartItems = await Cart.query().withGraphFetched("cart_items");
    res.json({
      msg: "Card Deleted",
      paylod: cart,
      success: false,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

/******************* UPDATE_ITEM SECTION STARTS ****************/

module.exports = { ADD_ITEM, DELETE_ITEM, DELETE_CART };
