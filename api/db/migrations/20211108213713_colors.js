exports.up = function (knex) {
  return knex.schema.createTable("colors", function (table) {
    table.increments("id");
    table.string("name").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("colors");
};
