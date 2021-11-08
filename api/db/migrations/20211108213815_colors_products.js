exports.up = function (knex) {
  return knex.schema.createTable("colors_products", function (table) {
    table.integer("color_id").references("id").inTable("colors").notNull().onDelete('cascade');;
    table.integer("product_id").references("id").inTable("products").notNull().onDelete('cascade');;
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("colors_products");
};
