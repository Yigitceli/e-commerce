const { Model } = require("objection");
const Knex = require("../db");
const softDelete = require("objection-soft-delete");

Model.knex(Knex);

class User extends Model {
  // Table name is the only required property.

  static get tableName() {
    return "users";
  }

  fullName() {
    return this.first_name + " " + this.last_name;
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        first_name: { type: "string" },
        last_name: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
        deleted: { type: "boolean" },
      },
    };
  }
  static get relationMappings() {
    const Cart = require("./Cart");
    return {
      carts: {
        relation: Model.HasManyRelation,
        modelClass: Cart,
        join: {
          from: "users.id",
          to: "carts.user_id",
        },
      },
    };
  }
}
module.exports = User;
