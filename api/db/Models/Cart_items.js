const { Model } = require("objection");
const Knex = require("../db");
const softDelete = require("objection-soft-delete");

Model.knex(Knex);

class CartItem extends Model {
  // Table name is the only required property.

  static get tableName() {
    return "cart_items";
  }
}
module.exports = CartItem;
