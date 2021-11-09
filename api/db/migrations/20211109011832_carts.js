exports.up = function (knex) {
  return knex.schema.createTable("carts", function (table) {
      table.increments('id');
      table.integer('user_id').references('id').inTable('users');
      table.boolean('deleted').default(false);
      table.timestamps(true,true)
  });
};

exports.down = function (knex) {
    return knex.schema.dropTable('carts');
};
