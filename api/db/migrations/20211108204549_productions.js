exports.up = async function (knex) {
  if (await knex.schema.hasTable("products")) {
    return;
  }
  return knex.schema.createTable("products", function (table) {
    table.increments("id");
    table.string("title", 255).notNullable();
    table.string("description", 255).notNullable();
    table.boolean("in_stock").default(true);

    table.decimal("price").notNullable();
    table.string("image").notNullable();
    table.boolean("deleted").default(false);
    table.timestamps(true,true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("products");
};
