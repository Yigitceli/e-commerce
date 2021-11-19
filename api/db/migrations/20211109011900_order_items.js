exports.up = function (knex) {
  return knex.schema.createTable("order_items", function (table) {
    table.integer("order_id").references("id").inTable("orders").onDelete('cascade');
    table.integer("product_id").references("id").inTable("products").onDelete('cascade');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("order_items");
};
