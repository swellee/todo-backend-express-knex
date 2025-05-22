const orgs = require("../database/org-queries.js");
const { addErrorReporting } = require("../utils");

async function getOrg(req, res) {
  const { id } = req.params;
  const org = await orgs.getOrg(orgId);

  if (!org) {
    return res.status(404).json({ message: "Organization not found" });
  }
  res.send(org);
}

async function getUserOrgs(req, res) {
  const user_id = req.user.id;
  const allOrgs = await orgs.getUserOrgs(user_id);
  res.send(allOrgs);
}

async function createOrg(req, res) {
  const { name } = req.body;
  const user_id = req.user.id;
  const newOrg = await orgs.createOrg(name, user_id);
  res.send(newOrg);
}

async function updateOrg(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const updatedOrg = await orgs.updateOrg(orgId, name);
  res.send(updatedOrg);
}

async function deleteOrg(req, res) {
  const { id } = req.params;
  await orgs.deleteOrg(id);
}

async function getOrgMembers(req, res) {
  const { id } = req.params;
  const members = await orgs.getOrgMembers(id);
  res.send(members);
}

async function addOrgMember(req, res) {
  const { orgId, userId } = req.body;
  const boundUser = await orgs.addOrgMember(orgId, userId);
  res.send(boundUser);
}

async function removeOrgMember(req, res) {
  const { orgId, userId } = req.body;
  await orgs.removeOrgMember(orgId, userId);
}

const toExports = {
  getOrg: { method: getOrg, errorMessage: "Organization not found" },
  getUserOrgs: { method: getUserOrgs, errorMessage: "No organizations found" },
  createOrg: { method: createOrg, errorMessage: "Organization not created" },
  updateOrg: { method: updateOrg, errorMessage: "Organization not updated" },
  deleteOrg: { method: deleteOrg, errorMessage: "Organization not deleted" },
  getOrgMembers: { method: getOrgMembers, errorMessage: "No members found" },
  addOrgMember: { method: addOrgMember, errorMessage: "Member not added" },
  removeOrgMember: {
    method: removeOrgMember,
    errorMessage: "Member not removed",
  },
};

for (let route in toExports) {
  toExports[route] = addErrorReporting(
    toExports[route].method,
    toExports[route].errorMessage
  );
}
module.exports = toExports;
