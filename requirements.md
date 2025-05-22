# Requirements
1. add user system
  - creagte user migration file
  - add user seeds file
  - add refrerence to user in todos
  - add user-routes

2. implement authentication
  - add authentication middleware

3. implement client part

4. polish
  1.add organization system
  - create organization migration file
    - id
    - name
  - create users_organizations migration file
    - id
    - user_id
    - org_id
    - role (admin, member)
  - add reference to organization in todos and users
  - add organization-routes
    - create organization
    - list all organizations
    - delete organization
    - update organization
    - invite user to organization
    - user accept invite
    - user reject invite
    - user leave organization
  - within onboarding flow, user create or pick organization

  - add organization-seeds data in users and todos

  2.add category system
  - create category migration file
    - id
    - name
    - user_id
    - organization_id
  - add reference to category in todos
  - add category-routes
    - list all todos within current organization group by category
    - create category
    - delete category(should move out all todos to other category)
  3. add comment system
  - create comment migration file
    - id
    - content
    - user_id
    - todo_id

5.operations after polish
  - within onboarding flow, user create or pick organization
    - relevant apis: create organization, list all organiztions, add user to organization
  - after login, dashboard menu should include todos(default page),organizations, and a header dropdown filter to pick
  current organization
    - on todos page, render all the todos group by category of current organization.
    - on todos page, user can create, delete, update, comment todo.
    - on organization page, render all the organizations of current user. user can create, delete, update, invite, accept, reject, leave organization depend on the role of current user.
