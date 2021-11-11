const Model = require("../db");
const Knex = require("../db");

Model.knex(Knex);

class Cart extends Model {
  // Table name is the only required property.

  static get tableName() {
    return "carts";
  }
  static get id() {
    return "id";
  }

  static get relationMappings() {
    const User = require("./User");
    const Order = require("./Order");
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "carts.user_id",
          to: "users.id",
        },
      },
      order: {
        relation: Model.HasOneRelation,
        modelClass: Order,
        join: {
          from: "carts.id",
          to: "orders.id",
        },
      },
    };
  }
}

module.exports = Cart;
