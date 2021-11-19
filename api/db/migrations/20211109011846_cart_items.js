exports.up = function (knex) {
  return knex.schema.createTable("cart_items", function (table) {
    table.integer("cart_id").references("id").inTable("carts").onDelete('cascade');
    table.integer("product_id").references("id").inTable("products").onDelete('cascade');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("cart_items");
};
