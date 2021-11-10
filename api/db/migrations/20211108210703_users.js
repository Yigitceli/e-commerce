exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id");
    table.string("first_name", 255).notNullable();
    table.string("last_name", 255).notNullable();
    table.string("username").notNullable();
    table.string("password").notNullable();
    table.boolean("is_admin").default(false);
    table.boolean("deleted").default(false);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
