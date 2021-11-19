const { Model } = require("objection");
const Knex = require("../db");

Model.knex(Knex);

class Product extends Model {
  // Table name is the only required property.

  static get tableName() {
    return "products";
  }
  static get jsonSchema() {
    return {
      type: "object",
      properties: {        
        title: { type: "string" },
        description: { type: "text" },
        category: { type: "string" },
        price: { type: "decimal" },
        image: { type: "string" },
      },
    };
  }
  static get relationMappings() {
    const Color = require("./Color");
    const Size = require("./Size");

    return {
      colors: {
        relation: Model.ManyToManyRelation,
        modelClass: Color,
        join: {
          from: "products.id",
          through: {
            from: "colors_products.product_id",
            to: "colors_products.color_id",
          },
          to: "colors.id",
        },
      },
      sizes: {
        relation: Model.ManyToManyRelation,
        modelClass: Size,
        join: {
          from: "products.id",
          through: {
            from: "sizes_products.product_id",
            to: "sizes_products.size_id",
          },
          to: "sizes.id",
        },
      },
    };
  }
}
module.exports = Product;
