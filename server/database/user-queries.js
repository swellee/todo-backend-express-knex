const knex = require("./connection.js");

async function signup(username, password){
    const addedUser = await knex('users').insert({username, password}).returning('id, username');
    return addedUser;
}

async function login(username, password){
    const user = await knex('users').where({username, password}).returning('id').first();
    return user;
}

async function info(id) {
    const results = await knex('users').where({ id });
    return results[0];
}

module.exports = {
    signup,
    login,
    info
}