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
var morgan = require('morgan'); // Logging
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var cors = require('cors'); // Allow cross-site requests


console.log('Starting server in environment "' + config.get('env') + '"');

/**
 * Configure the application
 */
app.use(bodyParser.urlencoded({extended: true})); // Simplified body reading: adds <form> element data to the body
app.use(bodyParser.json());
app.use(morgan('dev'));// use morgan to log requests to the console
app.set('jsonTokenVerificationSecret', config.get('security:jsonTokenVerificationSecret')); // secret variable to verify JSON tokens
app.use(cors()); // Allow cross-site requests

/**
 * Load controllers
 */
var userCtrl = require('./controllers/user-ctrl.js');

/**
 * START ROUTES
 */
    //Route middleware: require authentication
router.use(function (req, res, next) {

    // Define routes that are accessible without authentication
    var unauthAccess = [
        '/users/login'
    ];


    if (unauthAccess.indexOf(req.url) >= 0) {
        // Allowed in any case, without authentication
        console.log('No authentication required for request "' + req.url + '"');
        next();
    }
    else {
        console.log('Must authenticate user for request "' + req.url + '"');

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('jsonTokenVerificationSecret'), function (err, decoded) {
                if (err) {
                    return res.json({success: false, message: 'Failed to authenticate token.'});
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {
            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    }
});

router.get('/', function (req, res) {
    res.json({message: 'Please use an api call'});
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
    if (err) {
        console.log('Cannot connect to database: ' + err);
    }
    else {
        console.log('Successfully connected to database');
    }

    // Start listening
    app.listen(config.get('app:port'), ()=> {
        console.log('listening on port ' + config.get('app:port'))
    });
})
;



