/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("todos").del();
  await knex("todos").insert([
    { id: 1, title: "the first todo", order: 1, completed: false },
    { id: 2, title: "the second todo", order: 2, completed: false },
    { id: 3, title: "the third todo", order: 3, completed: false },
  ]);
};
