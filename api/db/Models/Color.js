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
        id: { type: "integer" },
        name: { type: "string" },
      },
    };
  }
  static get relationMappings() {
    return {};
  }
}
module.exports = Color;
