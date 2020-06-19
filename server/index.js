const express = require('express');
const db = require('../database');

// Middleware
const bodyParser = require('body-parser');

var router = require('./routes.js');

const app = express();
module.exports.app = app;

app.set('port', 3030);

app.use(bodyParser.json());

app.use('/', router);

// Serve the client files
app.use(express.static(__dirname + '/../client/dist'));
console.log('In users get');
// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}
