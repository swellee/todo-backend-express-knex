/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex("todos").del();

  // insert users
  await knex('users').insert([
    {username: 'user1', password: 'password1'},
    {username: 'user2', password: 'password2'},
  ])

  const user1 = await knex('users').first();
  // insert todos
  await knex("todos").insert([
    { title: "the first todo", order: 1, completed: false, user_id: user1.id },
    { title: "the second todo", order: 2, completed: false, user_id: user1.id },
    { title: "the third todo", order: 3, completed: false, user_id: user1.id },
  ]);
};
