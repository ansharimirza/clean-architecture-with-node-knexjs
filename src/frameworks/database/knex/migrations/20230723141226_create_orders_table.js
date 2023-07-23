/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('orders', function (table) {
        table.increments('id');
        table.integer('userId');
        table.specificType('productsIds', 'integer ARRAY');
        table.date('date');
        table.boolean('isPayed');
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
    .dropTable('orders');
};
