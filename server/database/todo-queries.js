const knex = require("./connection.js");

async function all(query = {}) {
    return knex('todos').where(query).orderBy('order');
}

async function getOrgTodos(orgId, limit=9999, offset=0) {
    return knex('todos')
    .join('categories', 'todos.category_id', 'categories.id')
    .where({ org_id: orgId })
    .select('todos.*', 'categories.name as category_name')
    .orderBy('order')
    .limit(limit)
    .offset(offset);
}

async function get(id) {
    const results = await knex('todos').where({ id });
    return results[0];
}

async function create(title, order) {
    const results = await knex('todos').insert({ title, order }).returning('*');
    return results[0];
}

async function update(id, properties) {
    const results = await knex('todos').where({ id }).update({ ...properties }).returning('*');
    return results[0];
}

// delete is a reserved keyword
async function del(id) {
    const results = await knex('todos').where({ id }).del().returning('*');
    return results[0];
}

async function clear() {
    return knex('todos').del().returning('*');
}

module.exports = {
    all,
    get,
    create,
    update,
    delete: del,
    getOrgTodos,
    clear
}