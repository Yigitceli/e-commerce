const Model = require("../db");
const softDelete = require('objection-soft-delete');


class User extends softDelete({ columnName: "deleted" })(Model) {
  // Table name is the only required property.

  static get tableName() {
    return "users";
  }

  static get id() {
    return "id";
  }

  fullName() {
    return this.first_name + " " + this.last_name;
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        first_name: { type: "string" },
        last_name: { type: "string" },
        is_admin: { type: "boolean" },
        deleted: { type: "boolean" },
        username: { type: "string", minLength: 6, maxLength: 22 },
        password: { type: "string", minLength: 6, maxLength: 22 },
      },
    };
  }
  static get relationMappings() {
    return {};
  }
}
module.exports = User;
