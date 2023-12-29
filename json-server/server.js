require("dotenv").config();
const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();

const router = jsonServer.router(path.join(__dirname, "./db.json"));
const auth = require("json-server-auth");
const middlewares = jsonServer.defaults();

server.db = router.db;
const JSON_SERVER_PORT = process.env.JSON_SERVER_PORT || 7001;

const rules = auth.rewriter({
  // Permission rules
  users: 660,
  notifications: 660,
});

server.use(middlewares);
server.use(rules);
server.use(auth);
server.use(router);
server.listen(JSON_SERVER_PORT, () => {
  console.log(`JSON Server is running on port ${JSON_SERVER_PORT}`); // eslint-disable-line
});
