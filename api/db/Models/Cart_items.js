const { Model } = require("objection");
const Knex = require("../db");
const softDelete = require("objection-soft-delete");

Model.knex(Knex);

class CartItem extends Model {
  // Table name is the only required property.

  static get tableName() {
    return "cart_items";
  }
  static get relationMappings() {
    return {
      cart: {
        relation: Model.BelongsToOneRelation,
        modelClass: require("./Cart"),
        join: {
          from: "cart_items.cart_id",
          to: "carts.id",
        },
      },

      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: require("./Product"),
        join: {
          from: "cart_items.product_id",
          to: "products.id",
        },
      },

      cart_color: {
        relation: Model.BelongsToOneRelation,
        modelClass: require("./Color"),
        join: {
          from: "cart_items.color",
          to: "colors.id",
        },
      },

      cart_size: {
        relation: Model.BelongsToOneRelation,
        modelClass: require("./Size"),
        join: {
          from: "cart_items.size",
          to: "sizes.id",
        },
      },
    };
  }
}
module.exports = CartItem;
