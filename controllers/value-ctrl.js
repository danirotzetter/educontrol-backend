var express = require('express');
var values = express.Router();
var Model = require('../models/value.js');
var Activity = require('../models/activity.js');
const config = require('../app/config.js');


/**
 * ===============
 * START-ROUTING
 * ===============
 */
var byActivity = express.Router({mergeParams:true});
values.use('/byActivity', byActivity);
/**
 * Find by activityId
 */
byActivity.get('/', function (req, res) {
    console.log('Get by activityId');
    var id = req.query.activityId;
    Model.findOne({'activity._id': id}).populate({populate: 'activity school'}).exec(function (err, value) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting object'
            });
        }
        if (!value) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        return res.json(value);
    });
});
/**
 * ===============
 * END-ROUTING
 * ===============
 */

/**
 * Find by id
 */
values.get('/:id', function (req, res) {
    console.log('Get by id');
    var id = req.params.id;
    Model.findOne({_id: id}).populate({path: 'activity school'}).exec(function (err, project) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting object'
            });
        }
        if (!value) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        return res.json(value);
    });
});

/**
 * Create new value
 */
values.post('/', function (req, res) {
    console.log('About to save value');
    var value = new Model({
        date: req.body.date,
        figure: req.body.figure,
        activity:req.body.activity,
        metric: req.body.metricId,
        school: req.body.school
    });
    value.save(function (err, value) {
        if (err) {
            console.log('Error saving value ' + err);
            return res.status(500).json({
                message: 'Error when saving',
                error: err
            });
        }
        else {
            console.log('Successfully saved value ' + err);
            return res.json({
                message: 'saved',
                _id: value._id
            });
        }
    });
});

/**
 * Update
 */
values.put('/:id', function (req, res) {
    var id = req.params.id;
    console.log('Update value with id ' + id);
    Model.findByIdAndUpdate({_id: id},
        req.body,
        {upsert: true, safe: true},
        function (err, value) {
            if (err) {
                console.log('Err ' + err);
                return res.status(500).json({
                    message: 'Error updating',
                    error: err
                });
            }
            else if (!value) {
                return res.status(404).json({
                    message: 'Not found'
                });
            }
            else {
                console.log('Successfully updated');
                return res.json(req.body);
            }
        });
});


/**
 * Delete by id
 */
values.delete('/:id', function (req, res) {
    var id = req.params.id;
    console.log('About to delete value ' + id);
    Model.findOne({_id: id}, function (err, value) {
        if (err) {
            return res.status(500).json({
                message: 'Error finding object'
            });
        }
        if (!value) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        value.remove(function (err) {
            if (err) {
                return res.status(500).json({
                    message: 'Error deleting'
                });
            }
            return res.json({message: 'Successfully deleted object'});
        });
    });
});




module.exports = values;