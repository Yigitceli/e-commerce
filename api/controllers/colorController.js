const Color = require("../db/Models/Color");
const Product = require("../db/Models/Product");

/******************* GET_PRODUCTS SECTION STARTS ****************/
const ADD_COLOR = async (req, res, next) => {
  const user = req.user;
  const { name, id } = req.body;
  try {
    if (!user.is_admin) {
      return res
        .status(402)
        .json({ msg: "Unauhtorized Access!", success: false });
    }

    try {
      const color = await Color.query().insertAndFetch({ name });
      var product = await Product.relatedQuery("colors")
        .for(id)
        .relate(color.id);
    } catch (error) {
      return res.send(error);
      return res.status(406).json({ msg: "Invalid Inputs.", success: false });
    }

    return res.status(200).json({
      msg: "Color Added to Product.",
      payload: product,
      success: true,
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

const DELETE_COLOR = async (req, res, next) => {
  
};

module.exports = { ADD_COLOR, DELETE_COLOR };
