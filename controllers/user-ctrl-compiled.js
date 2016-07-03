var express = require('express');
var users = express.Router();
var Model = require('../models/user.js');

users.get('/', function (req, res) {
    Model.find(function (err, list) {
        if (err) {
            return res.json(500, {
                message: 'Error getting users.'
            });
        }
        return res.json(list);
    });
});

users.post('/', function (req, res) {
    var user = new Model({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    });
    user.save(function (err, user) {
        if (req.accepts('json')) {
            if (err) {
                return res.json(500, {
                    message: 'Error saving user',
                    error: err
                });
            }
            return res.json({
                message: 'saved',
                _id: user._id
            });
        } else {
            if (err) {
                return res.send('500: Internal Server Error', 500);
            }
            return res.render('users/edit', { user: user });
        }
    });
});

users.get('/:id', function (req, res) {
    var id = req.params.id;
    Model.findOne({ _id: id }, function (err, user) {
        if (req.accepts('json')) {
            if (err) {
                return res.json(500, {
                    message: 'Error getting user.'
                });
            }
            if (!user) {
                return res.json(404, {
                    message: 'No such user'
                });
            }
            return res.json(user);
        } else {
            if (err) {
                return res.send('500: Internal Server Error', 500);
            }
            if (!user) {
                return res.end('No such user');
            }
            return res.render('users/edit', { user: user, flash: 'Created.' });
        }
    });
});

users.put('/:id', function (req, res) {
    var id = req.params.id;
    Model.findOne({ _id: id }, function (err, user) {
        if (req.accepts('json')) {
            if (err) {
                return res.json(500, {
                    message: 'Error saving user',
                    error: err
                });
            }
            if (!user) {
                return res.json(404, {
                    message: 'No such user'
                });
            }
            user.name = req.body.name ? req.body.name : user.name;
            user.email = req.body.email ? req.body.email : user.email;
            user.age = req.body.age ? req.body.age : user.age;
            user.save(function (err, user) {
                if (err) {
                    return res.json(500, {
                        message: 'Error getting user.'
                    });
                }
                if (!user) {
                    return res.json(404, {
                        message: 'No such user'
                    });
                }
                return res.json(user);
            });
        } else {
            if (err) {
                return res.send('500: Internal Server Error', 500);
            }
            if (!user) {
                return res.end('No such user');
            }
            user.name = req.body.name ? req.body.name : user.name;
            user.email = req.body.email ? req.body.email : user.email;
            user.age = req.body.age ? req.body.age : user.age;
            user.save(function (err, user) {
                if (err) {
                    return res.send('500: Internal Server Error', 500);
                }
                if (!user) {
                    return res.end('No such user');
                }
                return res.render('users/edit', { user: user, flash: 'Saved.' });
            });
        }
    });
});

users.delete('/:id', function (req, res) {
    var id = req.params.id;
    Model.findOne({ _id: id }, function (err, user) {
        if (req.accepts('json')) {
            if (err) {
                return res.json(500, {
                    message: 'Error getting user.'
                });
            }
            if (!user) {
                return res.json(404, {
                    message: 'No such user'
                });
            }
            return res.json(user);
        } else {
            if (err) {
                return res.send('500: Internal Server Error', 500);
            }
            if (!user) {
                return res.end('No such user');
            }
            return res.render('index', { flash: 'Item deleted.' });
        }
    });
});

module.exports = users;

//# sourceMappingURL=user-ctrl-compiled.js.map