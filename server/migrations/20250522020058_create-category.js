/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('categories', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('user_id').notNullable().references('id').inTable('users');
    table.integer('org_id').notNullable().references('id').inTable('organizations');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('categories');
};
