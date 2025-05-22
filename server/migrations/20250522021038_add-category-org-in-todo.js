/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('todos', table => {
    table.integer('category_id').references('id').inTable('categories');
    table.integer('org_id').references('id').inTable('organizations'); // add this line to add the org_id column to the tod
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('todos', table => {
    table.dropColumn('category_id');
    table.dropColumn('org_id'); // add this line to remove the org_id column from the todos table
  })
};
