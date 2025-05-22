const todo = require("./todo-routes.js");
const user = require("./user-routes.js");
const org = require("./org-routes.js");
const category = require("./category-routes.js");

function initRoutes(app) {
  // todo routes
  app.get("/todo/:id", todo.getTodo);
  app.get("/todo-list/:orgId", todo.getOrgTodos);
  app.post("/todo", todo.postTodo);
  app.patch("/todo/:id", todo.patchTodo);

  app.delete("/todo", todo.deleteAllTodos);
  app.delete("/todo/:id", todo.deleteTodo);

  // user routes
  app.post("/user/signup", user.signup);
  app.post("/user/login", user.login);
  app.get("/user/me", user.info);

  // organization routes
  app.post("/organization", org.createOrg);
  app.get("/organization/:id", org.getOrg);
  app.patch("/organization/:id", org.updateOrg);
  app.delete("/organization/:id", org.deleteOrg);
  // user organization routes
  app.get("/user-organization-list", org.getUserOrgs);
  app.post("/user-organization", org.addOrgMember);
  app.delete("/user-organization", org.removeOrgMember);

  // category routes
  app.post("/category", category.createCategory);
  app.get("/category/:id", category.getCategory);
  app.patch("/category/:id", category.updateCategory);
  app.delete("/category/:id", category.deleteCategory);
  app.get("/category-list/:orgId", category.getOrgCategories);
}

module.exports = { initRoutes };
