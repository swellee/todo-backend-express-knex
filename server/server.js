const app = require('./server-config.js');
const cors = require('cors')
const authenticate = require('./middleware/authenticate.js')
const { initRoutes } = require('./routes/index.js');
const port = process.env.PORT || 5000;
// middleware
app.use(cors())
app.use(require('body-parser').json());
app.use(authenticate);
// init routes
initRoutes(app);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;