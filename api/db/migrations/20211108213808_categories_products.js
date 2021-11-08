exports.up = function (knex) {
  return knex.schema.createTable("categories_products", function (table) {
    table
      .integer("category_id")
      .references("id")
      .inTable("categories")
      .notNull()
      .onDelete("cascade");
    table
      .integer("product_id")
      .references("id")
      .inTable("products")
      .notNull()
      .onDelete("cascade");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("categories_products");
};
