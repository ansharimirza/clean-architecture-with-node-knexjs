/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('users', function (table) {
        table.increments('id');
        table.string('name', 255).notNullable();
        table.string('lastName', 255);
        table.integer('gender', 10);
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
    .dropTable('users');
};
