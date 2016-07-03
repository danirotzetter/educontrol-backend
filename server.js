/**
 * Require libraries
 */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // To simplify dealing with mongodb
const http = require('http'); // For base http operations
const config = require('./app/config.js'); // Loads the configuration
const app = express();
const router = express.Router(); // get an instance of the express Router


console.log('Starting server in environment "' + config.get('env') + '"');

/**
 * Configure the application
 */
app.use(bodyParser.urlencoded({extended: true})); // Simplified body reading: adds <form> element data to the body
app.use(bodyParser.json());


/**
 * Load controllers
  */
var userCtrl= require('./controllers/user-ctrl.js');

/**
 * START ROUTES
 */
router.get('/', function(req, res) {
    res.json({ message: 'Please use an api call' });
});
// REGISTER OUR ROUTES -------------------------------
app.use('/', router);
app.use('/users', userCtrl);
/**
 * END ROUTES
 */


/**
 * Launch the application if connection to MongoDB is successful
 */
var mongoDbUrl = 'mongodb://' + config.get('db:username') + ':' + config.get('db:password') + '@' + config.get('db:host') + ':' + config.get('db:port') + '/' + config.get('db:database');
console.log('Attempt to connect to ' + mongoDbUrl);
mongoose.connect(mongoDbUrl, (err, database) => {
    // ... start the server
    if (err){
        console.log('Cannot connect to database: '+err);
    }
    else{
        console.log('Successfully connected to database');
    }

    // Start listening
    app.listen(config.get('app:port'), ()=> {
        console.log('listening on port ' + config.get('app:port'))
    });
})
;



