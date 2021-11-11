const Model = require("../db");
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
      orderItems: {
        relation: Model.ManyToManyRelation,
        modelClass: Product,
        join: {
          from: "orders.id",
          through: {
            from: "order_items.product_id",
            to: "order_items.order_id",
          },
          to: "products.id",
        },
      },
    };
  }
}

module.exports = Cart;
