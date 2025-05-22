/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users_organizations', table => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('id').inTable('users');
    table.integer('org_id').notNullable().references('id').inTable('organizations');
    table.enum('role', ['admin', 'member']).notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users_organizations');
};
