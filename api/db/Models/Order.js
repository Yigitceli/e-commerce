const { Model } = require("objection");
const Knex = require("../db");

Model.knex(Knex);

class Order extends Model {
  // Table name is the only required property.

  static get tableName() {
    return "orders";
  }
  static get id() {
    return "id";
  }

  static get relationMappings() {
    const Cart = require("./Cart");
    const Product = require("./Product");
    return {
      ownerCart: {
        relation: Model.BelongsToOneRelation,
        modelClass: Cart,
        join: {
          from: "orders.id",
          to: "carts.id",
        },
      },      
      
    };
  }
}

module.exports = Cart;
