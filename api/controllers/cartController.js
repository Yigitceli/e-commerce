const { id } = require("../db/Models/Cart");
const Cart = require("../db/Models/Cart");
const User = require("../db/Models/User");

/******************* CREATE_CART SECTION STARTS ****************/

const CREATE_CART = async (req, res, next) => {
  const user = req.user;
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
    } catch (error) {
      return res.status(406).json({ msg: "Invalid Inputs", success: false });
    }

    res.json({ msg: "Cart Created", payload: cart, success: false });
  } catch (error) {
    res.status(500).send(error);
  }
};

/******************* ADD_ITEM SECTION STARTS ****************/

const ADD_ITEM = async (req, res, next) => {
  const { quantity, item, color, size } = req.body;
  const { id } = req.params;
  try {
    try {
      await Cart.relatedQuery("cart_items")
        .for(id)
        .relate({ id: item, quantity: quantity, color, size });
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

module.exports = { CREATE_CART, ADD_ITEM, DELETE_ITEM, DELETE_CART };
