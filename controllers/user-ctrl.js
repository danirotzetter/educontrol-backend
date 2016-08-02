var express = require('express');
var users = express.Router();
var bcrypt = require('bcryptjs');
var Model = require('../models/user.js');
var Group = require('../models/group.js');
var jwt = require('jsonwebtoken');
const config = require('../app/config.js');

/**
 * Security
 */
var salt = bcrypt.genSaltSync(10);


/**
 * List of all users
 */
users.get('/', function (req, res) {
    Model.find({}).populate({path: 'group'}).exec(function (err, list) {
        if (err) {
            return res.json(500, {
                message: 'Error getting objects.'
            });
        }
        return res.json(list);
    });
});

/**
 * Create new user
 */
users.post('/', function (req, res) {
    var pwd = req.body.password;
    console.log(req.body);
    console.log('Generating password from password ' + pwd + ' and salt ' + salt);
    // By default: use the group 'user'
    var groupName = req.body.group || 'user';
    Group.findOne({name: groupName}, function (err, group) {
        var user = new Model({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            group: group
        });
        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when saving',
                    error: err
                });
            }
            return res.json({
                message: 'saved',
                _id: user._id
            });
        });
    });
});

/**
 * Update user by username
 */
users.put('/:username', function (req, res) {
    var username = req.params.username;
    Model.findOne({username: username}, function (err, user) {
        if (err) {
            return res.status(500).json({
                message: 'Error saving',
                error: err
            });
        }
        else if (!user) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        else {
            user.username = req.body.username ? req.body.username : user.username;
            user.password = req.body.password ? req.body.password : undefined; // Do not modify password if not set
            user.email = req.body.email ? req.body.email : user.email;
            user.group = req.body.group ? req.body.group : user.group;
            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error saving'
                    });
                }
                else if (!user) {
                    return res.status(404).json({
                        message: 'Not found'
                    });
                }
                else {
                    return res.json(user);
                }
            });
        }
    });
});

/**
 * Find user by username
 */
users.get('/:username', function (req, res) {
    var username = req.params.username;
    Model.findOne({username: username}).populate({path: 'group'}).exec(function (err, user) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting object'
            });
        }
        if (!user) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        return res.json(user);
    });
});


/**
 * Delete user by username
 */
users.delete('/:username', function (req, res) {
    var username = req.params.username;
    Model.findOne({username: username}, function (err, user) {
        if (err) {
            return res.status(500).json({
                message: 'Error deleting'
            });
        }
        if (!user) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        return res.json(user);
    });
});


/**
 * Login user
 */
users.post('/login', (req, res)=> {
    var username = req.body.username;
    var password = req.body.password;
    var authenticated = false;

    console.log('Processing login');
    console.log(req.body);

    // Find user
    Model.findOne({username: username}).populate({path: 'group'}).exec(function (err, user) {
        if (user) {
            // User found
            console.log('Compare password "' + password + '" with hash "' + user.password + '"');
            authenticated = bcrypt.compareSync(password, user.password);
            if (authenticated) {
                console.log('Login succeeded');
            }
            else {
                console.log('Login failure: password mismatch');
            }
        }
        else {
            console.log('Login failure: no user found with username "' + username + '"');
        }
        if (authenticated) {
            var secret = config.get('security:jsonTokenVerificationSecret');
            // create a token
            var token = jwt.sign(user, secret, {
                expiresIn: '24h'
            });

            // Remove properties before returning user object
            delete user.password;
            delete user._id;

            return res
                .json({
                    success: true,
                    user: user,
                    token: token
                });
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'Login failure'
            })
                ;
        }
    });


})
;


module.exports = users;