var express = require('express');
var metrics = express.Router();
var Model = require('../models/metric.js');
const config = require('../app/config.js');

/**
 * List of all metrics
 */
metrics.get('/', function (req, res) {
    Model.find(function (err, list) {
        if (err) {
            return res.json(500, {
                message: 'Error getting objects.'
            });
        }
        return res.json(list);
    });
});

/**
 * Find user by id
 */
metrics.get('/:id', function (req, res) {
    var id = req.params.id;
    Model.findOne({ _id: id }, function (err, metric) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting object'
            });
        }
        if (!metric) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        return res.json(metric);
    });
});

/**
 * Create new metric
 */
metrics.post('/', function (req, res) {
    console.log('About to save metric');
    var metric = new Model({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday
    });
    metric.save(function (err, user) {
        if (err) {
            console.log('Error saving metric ' + err);
            return res.status(500).json({
                message: 'Error when saving',
                error: err
            });
        } else {
            console.log('Successfully saved metric ' + err);
            return res.json({
                message: 'saved',
                _id: metric._id
            });
        }
    });
});

/**
 * Update
 */
metrics.put('/:id', function (req, res) {
    var id = req.params.id;
    console.log('Update metric with id ' + id);
    Model.findOne({ _id: id }, function (err, metric) {
        if (err) {
            return res.status(500).json({
                message: 'Error updating',
                error: err
            });
        } else if (!metric) {
            return res.status(404).json({
                message: 'Not found'
            });
        } else {
            metric.firstName = req.body.firstName ? req.body.firstName : metric.firstName;
            metric.lastName = req.body.lastName ? req.body.lastName : metric.lastName;
            metric.email = req.body.email ? req.body.email : metric.email;
            metric.birthday = req.body.birthday ? req.body.birthday : metric.birthday;
            metric.save(function (err, metric) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error saving'
                    });
                } else if (!metric) {
                    return res.status(404).json({
                        message: 'Not found'
                    });
                } else {
                    return res.json(metric);
                }
            });
        }
    });
});

/**
 * Delete by id
 */
metrics.delete('/:id', function (req, res) {
    var id = req.params.id;
    console.log('About to delete metric ' + id);
    Model.findOne({ _id: id }, function (err, metric) {
        if (err) {
            return res.status(500).json({
                message: 'Error finding object'
            });
        }
        if (!metric) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        metric.remove(function (err) {
            if (err) {
                return res.status(500).json({
                    message: 'Error deleting'
                });
            }
            return res.json({ message: 'Successfully deleted object' });
        });
    });
});

module.exports = metrics;

//# sourceMappingURL=metric-ctrl-compiled.js.map