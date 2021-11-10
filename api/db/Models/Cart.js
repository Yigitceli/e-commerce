const Model = require("../db");

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
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "cart.user_id",
          to: "user.id",
        },
      },
    };
  }
}


module.exports = Cart;
