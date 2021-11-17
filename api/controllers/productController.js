var jwt = require("jsonwebtoken");
const { whereExists } = require("../db/db");
const Product = require("../db/Models/Product");
require("dotenv").config();

/******************* GET_PRODUCTS SECTION STARTS ****************/

const GET_PRODUCTS = async (req, res, next) => {
  const { category, size, color } = req.query;
  try {
    const filter = Object.assign(
      {},
      category && { category },
      color && { color },
      size && { size }
    );
    
    if (!Object.keys(filter).length == 0) {      
      var products = await Product.query()
        .withGraphFetched("[sizes, colors]")
        .select("*")
        .where({ category });
      console.log(products);
      if (filter.color) {
        products = products.filter((item) =>
          item.colors.some((colorItem) => {
            return colorItem.name == color;
          })
        );
      }
      if (filter.size) {
        products = products.filter((item) =>
          item.sizes.some((sizeItem) => {
            return sizeItem.size == size.toUpperCase();
          })
        );
      }
    } else {
      var products = await Product.query().select("*");
    }

    if (products.length <= 0) {
      return res
        .status(404)
        .json({ msg: "There is no product!", success: false });
    }
    res
      .status(200)
      .json({ msg: "Products sent!", success: true, payload: products });
  } catch (error) {
    res.sendStatus(500);
  }
};

/******************* GET_PRODUCT SECTION STARTS ****************/

const GET_PRODUCT = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.query().select("*").where({ id }).first();

    const colors = await Product.relatedQuery("colors")
      .for(product)
      .select("*");

    const sizes = await Product.relatedQuery("sizes").for(product).select("*");

    const data = { product, colors, sizes };

    if (!product) {
      return res
        .status(404)
        .json({ msg: "There is no product!", success: false });
    }
    res.status(200).json({
      msg: `Product with ID:${id} sent!`,
      success: true,
      payload: data,
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = { GET_PRODUCTS, GET_PRODUCT };
