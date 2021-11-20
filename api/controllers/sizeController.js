const Size = require("../db/Models/Size");

/******************* ADD_SIZE SECTION STARTS ****************/
const ADD_SIZE = async (req, res, next) => {
  const user = req.user;
  const { size } = req.body;
  try {
    if (!user.is_admin) {
      return res
        .status(402)
        .json({ msg: "Unauhtorized Access!", success: false });
    }

    try {
      var newSize = await Size.query().insertAndFetch({ size });
    } catch (error) {
      return res.status(406).json({ msg: "Invalid Inputs.", success: false });
    }

    return res.status(200).json({
      msg: "Size Added.",
      payload: newSize,
      success: true,
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

/******************* DELETE_SIZE SECTION STARTS ****************/

const DELETE_SIZE = async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;
  try {
    if (!user.is_admin) {
      return res
        .status(402)
        .json({ msg: "Unauhtorized Access!", success: false });
    }
    try {
      await Size.query().deleteById(id);
    } catch (error) {
      return res.status(406).json({ msg: "Invalid Inputs.", success: false });
    }
    return res.json({ msg: "Size Removed.", payload: id, success: true });
  } catch (error) {
    res.sendStatus(500);
  }
};

/******************* GET_SIZES SECTION STARTS ****************/

const GET_SIZES = async (req, res, next) => {
  const user = req.user;
  try {
    if (!user.is_admin) {
      return res
        .status(402)
        .json({ msg: "Unauhtorized Access!", success: false });
    }
    try {
      var sizes = await Size.query().select("*");
    } catch (error) {
      return res.status(406).json({ msg: "Invalid Inputs.", success: false });
    }
    return res.json({ msg: "Sizes Sent.", payload: sizes, success: true });
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = { ADD_SIZE, GET_SIZES, DELETE_SIZE };
