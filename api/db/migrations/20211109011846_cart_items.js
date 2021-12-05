exports.up = function (knex) {
  return knex.schema.createTable("cart_items", function (table) {
    table.increments("id");
    table
      .integer("cart_id")
      .references("id")
      .inTable("carts")
      .onDelete("cascade");
    table
      .integer("product_id")
      .references("id")
      .inTable("products")
      .onDelete("cascade");
    table.integer("quantity").default(1);
    table.integer("color").references("id").inTable("colors").notNullable();
    table.integer("size").references("id").inTable("sizes").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("cart_items");
};
