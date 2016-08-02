var express = require('express');
var activities = express.Router();
var Project = require('../models/project.js');
var Activity = require('../models/activity.js');
var Value = require('../models/value.js');
const config = require('../app/config.js');


/**
 * List of all activities
 */
activities.get('/', function (req, res) {
    Activity.find({}).populate({path: 'values', populate: {path: 'metrics'}}).exec(function (err, list) {
        if (err) {
            return res.json(500, {
                message: 'Error getting objects'
            });
        }
        return res.json(list);
    });
});


/**
 * Find user by id
 */
activities.get('/:id', function (req, res) {
    var id = req.params.id;
    Activity.findOne({_id: id}).populate({path: 'values', populate: {path: 'metrics'}}).exec(function (err, project) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting object'
            });
        }
        if (!project) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        return res.json(project);
    });
});


/**
 * Create new activity
 */
activities.post('/', function (req, res) {
    // Activity object
    var activity = new Activity({
        name: req.body.name,
        date: req.body.date,
        activities:req.body.activities
    });

    Activity.save(function (err, activity) {
        if (err) {
            console.log('Error saving project ' + err);
            return res.status(500).json({
                message: 'Error when saving',
                error: err
            });
        }
        else {
            console.log('Successfully saved project ' + err);
            return res.json({
                message: 'saved',
                _id: project._id
            });
        }
    });
});




module.exports = projects;