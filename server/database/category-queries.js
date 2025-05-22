const knex = require("./connection");

async function getAllCategories(query) {
  return await knex("categories").where(query);
}
async function getCategory(categoryId) {
  return await knex("categories").where({ id: categoryId }).first();
}
async function createCategory(name) {
  return await knex("categories").insert({ name }).returning("*");
}
async function updateCategory(categoryId, name) {
  return await knex("categories").where({ id: categoryId }).update({ name }).returning("*");
}
async function deleteCategory(categoryId) {
  return await knex("categories").where({ id: categoryId }).del();
}

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
}