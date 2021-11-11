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
    return {};
  }
}
module.exports = Size;
