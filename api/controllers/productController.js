const Product = require("../db/Models/Product");

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

      if (filter.color) {
        products = products?.filter((item) =>
          item.colors.some((colorItem) => {
            return colorItem.name == color;
          })
        );
      }
      if (filter.size) {
        products = products?.filter((item) =>
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
    const product = await Product.query()
      .withGraphFetched("[sizes, colors]")
      .select("*")
      .where({ id })
      .first();

    if (!product) {
      return res
        .status(404)
        .json({ msg: "There is no product!", success: false });
    }
    res.status(200).json({
      msg: `Product with ID:${id} sent!`,
      success: true,
      payload: product,
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

/******************* ADD_PRODUCT SECTION STARTS ****************/

const ADD_PRODUCT = async (req, res, next) => {
  const user = req.user;
  const { colors, sizes, ...data } = req.body;
  try {
    if (!user.is_admin) {
      return res
        .status(402)
        .json({ msg: "Unauhtorized Access!", success: false });
    }

    try {
      let product = await Product.transaction(async (trx) => {
        let product = await Product.query(trx).insertAndFetch(data);

        await Product.relatedQuery("colors", trx)
          .for(product.id)
          .relate(colors);

        await Product.relatedQuery("sizes", trx).for(product.id).relate(sizes);

        return product;
      });
      return res.json({
        msg: "Product Added.",
        payload: product,
        success: true,
      });
    } catch (error) {
      return res.send(error);
      return res.status(406).json({ msg: "Invalid Inputs", success: false });
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

/******************* UPDATE_PRODUCT SECTION STARTS ****************/

const UPDATE_PRODUCT = async (req, res, next) => {
  const { id } = req.params;
  const { colors, sizes, ...data } = req.body;
  const user = req.user;
  try {
    if (!user.is_admin) {
      return res
        .status(402)
        .json({ msg: "Unauhtorized Access!", success: false });
    }
    try {
      let product = await Product.transaction(async (trx) => {
        let product = await Product.query(trx).patchAndFetchById(id, {
          ...data,
        });

        await Product.relatedQuery("colors", trx)
          .for(id)
          .unrelate()
          .where("product_id", id);

        product = await Product.relatedQuery("colors", trx)
          .for(id)
          .relate(colors);

        await Product.relatedQuery("sizes", trx)
          .for(id)
          .unrelate()
          .where("product_id", id);

        product = await Product.relatedQuery("sizes", trx)
          .for(id)
          .relate(sizes);
        return product;
      });
      return res.json({
        msg: "Product Updated.",
        payload: product,
        success: true,
      });
    } catch (error) {
      return res.status(406).json({ msg: "Invalid Inputs", success: false });
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

/******************* DELETE_PRODUCT SECTION STARTS ****************/

const DELETE_PRODUCT = async (req, res, next) => {
  const { id } = req.params;
  const user = req.user;
  try {
    if (!user.is_admin) {
      return res
        .status(402)
        .json({ msg: "Unauhtorized Access!", success: false });
    }
    try {
      const product = await Product.query().deleteById(id);
      return res.json({ msg: "Product Deleted.", success: true });
    } catch (error) {
      return res.status(406).json({ msg: "Invalid Inputs", success: false });
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  GET_PRODUCTS,
  GET_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
};
