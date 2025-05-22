const app = require('./server-config.js');
const todo = require('./routes/todo-routes.js');
const user = require('./routes/user-routes.js')
const cors = require('cors')
const authenticate = require('./middleware/authenticate.js')
const port = process.env.PORT || 5000;
// middleware
app.use(cors())
app.use(require('body-parser').json());
app.use(authenticate);

// todo routes
app.get('/todo', todo.getAllTodos);
app.get('/todo/:id', todo.getTodo);

app.post('/todo', todo.postTodo);
app.patch('/todo/:id', todo.patchTodo);

app.delete('/todo', todo.deleteAllTodos);
app.delete('/todo/:id', todo.deleteTodo);

// user routes
app.post('/user/signup', user.signup)
app.post('/user/login', user.login)
app.get('/user/me', user.info)

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;