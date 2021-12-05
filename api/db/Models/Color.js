const { Model } = require("objection");
const Knex = require("../db");

Model.knex(Knex);
class Color extends Model {
  // Table name is the only required property.

  static get tableName() {
    return "colors";
  }
  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        name: { type: "string" },
      },
    };
  }
  static get relationMappings() {
    const Product = require("./Product");
    const Cart = require("./Cart");

    return {
      item_color: {
        relation: Model.BelongsToOneRelation,
        modelClass: Cart,
        join: {
          from: "colors.id",
          to: "carts",
        },
      },

      cart_size: {
        relation: Model.ManyToManyRelation,
        modelClass: Size,
        join: {
          from: "colors.id",
          through: {
            from: "cart_items.color",
            to: "cart_items.size",
          },
          to: "sizes.id",
        },
      },
      cart_items: {
        relation: Model.ManyToManyRelation,
        modelClass: Cart,
        join: {
          from: "carts.id",
          through: {
            from: "cart_items.cart_id",
            to: "cart_items.color",
          },
          to: "colors.id",
        },
      },
      cart_color: {
        relation: Model.ManyToManyRelation,
        modelClass: Product,
        join: {
          from: "colors.id",
          through: {
            from: "cart_items.color",
            to: "cart_items.product_id",
          },
          to: "products.id",
        },
      },
    };
  }
}
module.exports = Color;
