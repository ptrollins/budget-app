const express = require("express");
const db = require("../database");

const bodyParser = require("body-parser");

var router = require("./routes.js");

const app = express();
module.exports.app = app;

app.set("port", 3030);

app.use(bodyParser.json());

app.use("/", router);

app.use(express.static(__dirname + "/../client/dist"));

if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}
