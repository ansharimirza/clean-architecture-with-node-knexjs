/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('products', function (table) {
        table.increments('id');
        table.string('name', 255).notNullable();
        table.string('description', 255);
        table.specificType('images', 'text ARRAY');
        table.integer('price');
        table.string('color', 255);
        table.json('meta');
        table.timestamps();
        table.date('updatedAt');
        table.date('deletedAt');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable('products');
};
