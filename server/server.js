const app = require('./server-config.js');
const todo = require('./routes/todo-routes.js');

const port = process.env.PORT || 5000;

app.get('/todo', todo.getAllTodos);
app.get('/todo/:id', todo.getTodo);

app.post('/todo', todo.postTodo);
app.patch('/todo/:id', todo.patchTodo);

app.delete('/todo', todo.deleteAllTodos);
app.delete('/todo/:id', todo.deleteTodo);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;