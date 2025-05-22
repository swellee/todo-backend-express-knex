/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('comments', table => {
    table.increments('id').primary();
    table.string('content').notNullable();
    table.integer('user_id').notNullable().references('id').inTable('users');
    table.integer('todo_id').notNullable().references('id').inTable('todos');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('comments');
};
