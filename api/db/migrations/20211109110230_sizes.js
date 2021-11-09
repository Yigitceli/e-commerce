
exports.up = function(knex) {
    return knex.schema.createTable("sizes", (table) => {
        table.increments('id');
        table.string('size').notNullable();
        table.timestamps(true,true);
    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('sizes');  
};
