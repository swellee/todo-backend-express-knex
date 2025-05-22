const category = require("../database/category-queries");
const { addErrorReporting } = require("../utils");
async function getOrgCategories(req, res) {
  const { orgId } = req.params;
  const orgCategories = await category.getAllCategories({ orgId });
  return res.send(orgCategories);
}
async function getCategory(req, res) {
  const cat = await category.getCategory(req.params.id);
  return res.send(cat);
}
async function createCategory(req, res) {
  const { name, orgId } = req.body;
  const userId = req.user.id;
  const newCat = await category.createCategory(name, userId, orgId);
  return res.send(newCat);
}
async function updateCategory(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const updatedCat = await category.updateCategory(id, name);
  return res.send(updatedCat);
}
async function deleteCategory(req, res) {
  await category.deleteCategory(req.params.id);
}

const toExport = {
  getOrgCategories: {
    method: getOrgCategories,
    errorMessage: "No categories found",
  },
  getCategory: { method: getCategory, errorMessage: "Category not found" },
  createCategory: {
    method: createCategory,
    errorMessage: "Category not created",
  },
  updateCategory: {
    method: updateCategory,
    errorMessage: "Category not updated",
  },
  deleteCategory: {
    method: deleteCategory,
    errorMessage: "Category not deleted",
  },
};

for (let route in toExport) {
  toExport[route] = addErrorReporting(
    toExport[route].method,
    toExport[route].errorMessage
  );
}

module.exports = toExport;
