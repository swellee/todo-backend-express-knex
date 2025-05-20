const jwt = require('jsonwebtoken');
const whitelist = [
  '/signup',
  '/login'
];
function authenticate(req, res, next) {
  if (whitelist.includes(req.path)) {
    return next();
  }
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  })
}
module.exports = authenticate;