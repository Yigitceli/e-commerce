const { Model } = require("objection");
const Knex = require("../db");

Model.knex(Knex);
class Size extends Model {
  // Table name is the only required property.

  static get tableName() {
    return "sizes";
  }
  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        id: { type: "integer" },
        size: { type: "string" },
      },
    };
  }
  static get relationMappings() {
    const Cart = require("./Cart");
    const Color = require("./Color");
    const Product = require("./Product");

    return {
      cart_size: {
        relation: Model.ManyToManyRelation,
        modelClass: Product,
        join: {
          from: "sizes.id",
          through: {
            from: "cart_items.size",
            to: "cart_items.product_id",
          },
          to: "products.id",
        },
      },
      cart_items: {
        relation: Model.ManyToManyRelation,
        modelClass: Cart,
        join: {
          from: "sizes.id",
          through: {
            from: "cart_items.cart_id",
            to: "cart_items.size",
          },
          to: "carts.id",
        },
      },
      cart_color: {
        relation: Model.ManyToManyRelation,
        modelClass: Color,
        join: {
          from: "sizes.id",
          through: {
            from: "cart_items.size",
            to: "cart_items.color",
          },
          to: "colors.id",
        },
      },
    };
  }
}
module.exports = Size;
