const knex = require("./connection");

async function getOrg(orgId) {
  const org = await knex("organizations").where({ id: orgId }).first();
  return org;
}
async function getUserOrgs(user_id) {
  const allOrgs = await knex("users_organizations")
    .join("organizations", "users_organizations.org_id", "organizations.id")
    .where({ user_id })
    .select(
      "organizations.id",
      "organizations.name",
      "users_organizations.role"
    );
  return allOrgs;
}

async function createOrg(name, user_id) {
  const newOrg = await knex("organizations").insert({ name }).returning("*");
  await knex("users_organizations").insert({
    user_id,
    org_id: newOrg[0].id,
    role: "admin",
  });
  return newOrg;
}

async function updateOrg(orgId, name) {
  const updatedOrg = await knex("organizations")
    .where({ id: orgId })
    .update({ name })
    .returning("*");
  return updatedOrg;
}
async function deleteOrg(orgId) {
  await knex("organizations").where({ id: orgId }).del();
}

async function getOrgMembers(orgId) {
  const members = await knex("users_organizations")
    .join("users", "users_organizations.user_id", "users.id")
    .where({ org_id: orgId })
    .select("users.id", "users.username", "users_organizations.role");
  return members;
}

async function addOrgMember(orgId, userId) {
  const member = await knex("users_organizations")
    .where({ org_id: orgId, user_id: userId })
    .first();
  if (member) {
    return member;
  }
  const newMember = await knex("users_organizations")
    .insert({ org_id: orgId, user_id: userId, role: "member" })
    .returning("*");
  return newMember;
}

async function removeOrgMember(orgId, userId) {
  await knex("users_organizations")
    .where({ org_id: orgId, user_id: userId })
    .del();
}
module.exports = {
  getOrg,
  getUserOrgs,
  createOrg,
  updateOrg,
  deleteOrg,
  getOrgMembers,
  addOrgMember,
  removeOrgMember,
};
