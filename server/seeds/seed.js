/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("todos").del();
  await knex('users').del();
  await knex("categories").del();
  await knex("organizations").del();
  await knex("users_organizations").del();

  // insert users
  await knex('users').insert([
    {username: 'user1', password: 'pass1'},
  ])
  const user1 = await knex('users').first();

  // insert organizations
  const orgs = await knex('organizations').insert([
    {name: 'org1'},
    {name: 'org2'},
  ]).returning('id');

  // insert users_organizations
  await knex('users_organizations').insert([
    {user_id: user1.id, org_id: orgs[0].id, role: 'admin'},
    {user_id: user1.id, org_id: orgs[1].id, role: 'member'},
  ])

  // insert categories
  const categories = await knex('categories').insert([
    {name: 'org1-cat1', user_id: user1.id, org_id: orgs[0].id},
    {name: 'org1-cat2', user_id: user1.id, org_id: orgs[0].id},
    {name: 'org1-cat3', user_id: user1.id, org_id: orgs[0].id},

    {name: 'org2-cat1', user_id: user1.id, org_id: orgs[1].id},
    {name: 'org2-cat2', user_id: user1.id, org_id: orgs[1].id},
    {name: 'org2-cat3', user_id: user1.id, org_id: orgs[1].id},
  ]).returning('id');
  // insert todos
  await knex("todos").insert([
    { title: "the first todo", order: 1, completed: false, user_id: user1.id , category_id: categories[0].id, org_id: orgs[0].id},
    { title: "the second todo", order: 2, completed: false, user_id: user1.id, category_id: categories[1].id, org_id: orgs[0].id},
    { title: "the third todo", order: 3, completed: false, user_id: user1.id, category_id: categories[2].id, org_id: orgs[0].id },

    { title: "the first todo of org2", order: 1, completed: false, user_id: user1.id , category_id: categories[3].id, org_id: orgs[1].id},
    { title: "the second todo of org2", order: 2, completed: false, user_id: user1.id, category_id: categories[4].id, org_id: orgs[1].id},
    { title: "the third todo of org2", order: 3, completed: false, user_id: user1.id, category_id: categories[5].id, org_id: orgs[1].id },
  ]);
};
