/**
 * Require libraries
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const config = require('./app/config.js'); // Loads the configuration

/**
 * Configure the application
 */
app.use(bodyParser.urlencoded({ extended: true })); // Simplified body reading: adds <form> element data to the body

/**
 * START DEFINE LISTENER
 */
app.get('/', (req, res) => {
  res.send('Hello World new');
});
/**
 * END DEFINE LISTENER
 */

/**
 * Launch the application if connection to MongoDB is successful
 */
var db;
var mongoDbUrl = 'mongodb://' + config.get('db:username') + ':' + config.get('db:password') + '@' + config.get('db:host') + ':' + config.get('db:port') + '/' + config.get('db:database');
console.log('Attempt to connect to ' + mongoDbUrl);
MongoClient.connect(mongoDbUrl, (err, database) => {
  // ... start the server
  if (err) return console.log(err);
  db = database;

  // Start listening
  app.listen(config.get('app:port'), function () {
    console.log('listening on port ' + config.get('app:port'));
  });
});

//# sourceMappingURL=server-compiled.js.map