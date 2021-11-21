const { Model } = require("objection");
const Knex = require("../db");
const softDelete = require("objection-soft-delete");

Model.knex(Knex);

class Cart extends softDelete({ columnName: "deleted" })(Model) {
  // Table name is the only required property.

  static get tableName() {
    return "carts";
  }
  static get id() {
    return "id";
  }
  static get relationMappings() {
    const User = require("./User");
    const Product = require("./Product");
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "carts.user_id",
          to: "users.id",
        },
      },
      cart_items: {
        relation: Model.ManyToManyRelation,
        modelClass: Product,
        join: {
          from: "carts.id",
          through: {
            from: "cart_items.cart_id",
            to: "cart_items.product_id",
            extra: ["quantity", 'color', 'size'],
          },
          to: "products.id",
        },
      },
    };
  }
}

module.exports = Cart;
