const Color = require("../db/Models/Color");
const Product = require("../db/Models/Product");

/******************* ADD_COLOR SECTION STARTS ****************/
const ADD_COLOR = async (req, res, next) => {
  const user = req.user;
  const { name } = req.body;
  try {
    if (!user.is_admin) {
      return res
        .status(402)
        .json({ msg: "Unauhtorized Access!", success: false });
    }

    try {
      var color = await Color.query().insertAndFetch({ name });
    } catch (error) {
      return res.status(406).json({ msg: "Invalid Inputs.", success: false });
    }

    return res.status(200).json({
      msg: "Color Added.",
      payload: color,
      success: true,
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

/******************* DELETE_COLOR SECTION STARTS ****************/

const DELETE_COLOR = async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;
  try {
    if (!user.is_admin) {
      return res
        .status(402)
        .json({ msg: "Unauhtorized Access!", success: false });
    }
    try {
      await Color.query().deleteById(id);
    } catch (error) {
      return res.status(406).json({ msg: "Invalid Inputs.", success: false });
    }
    return res.json({ msg: "Color Removed.", payload: id, success: true });
  } catch (error) {
    res.sendStatus(500);
  }
};

/******************* GET_COLORS SECTION STARTS ****************/

const GET_COLORS = async (req, res, next) => {
  const { category } = req.query;
  try {
    if (category) {
      try {
        var colors = await Product.transaction(async (trx) => {
          ids = await Product.query(trx).select("id").where({ category });
          ids = ids.map((item) => item.id);
          colors = await Product.relatedQuery("colors")
            .for(ids)
            .distinctOn("name");
          return colors;
        });
        return res.json({
          msg: "Colors Sent.",
          payload: colors,
          success: true,
        });
      } catch (error) {
        return res.status(406).json({ msg: "Invalid Inputs.", success: false });
      }
    } else {
      try {
        var colors = await Color.query().select("*");
      } catch (error) {
        return res.status(406).json({ msg: "Invalid Inputs.", success: false });
      }
    }

    return res.json({ msg: "Colors Sent.", payload: colors, success: true });
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = { ADD_COLOR, DELETE_COLOR, GET_COLORS };
