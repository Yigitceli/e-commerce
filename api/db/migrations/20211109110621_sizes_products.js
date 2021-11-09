exports.up = function (knex) {
  return knex.schema.createTable("sizes_products", function (table) {
    table.integer("size_id").references("id").inTable("sizes");
    table.integer("product_id").references("id").inTable("products").onDelete('cascade');
  });
};

exports.down = function (knex) {
    return knex.schema.dropTable('sizes_products')
};
