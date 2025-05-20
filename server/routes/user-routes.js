const { method } = require("lodash");
const users = require("../database/user-queries.js");
const jwt = require("jsonwebtoken");
const { addErrorReporting } = require("../utils.js");

function generateToken(user) {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return { user, token };
}
async function signup(req, res) {
  const { username, password } = req.body;
  const user = await users.signup(username, password);
  res.send(generateToken(user));
}

async function login(req, res) {
  const { username, password } = req.body;
  const user = await users.login(username, password);
  res.send(generateToken(user));
}

async function info(req, res) {
  const user = await users.info(req.user.id);
  res.send(generateToken(user));
}

const toExport = {
  signup: { method: signup, errorMessage: "username already exist." },
  login: { method: login, errorMessage: "username or password not match" },
  info: { method: info, errorMessage: "invalid token" },
};

for (let route in toExport) {
  toExport[route] = addErrorReporting(
    toExport[route].method,
    toExport[route].errorMessage
  );
}

module.exports = toExport;
