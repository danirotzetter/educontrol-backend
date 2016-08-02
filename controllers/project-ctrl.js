var express = require('express');
var projects = express.Router();
var Model = require('../models/project.js');
var Activity = require('../models/activity.js');
const config = require('../app/config.js');


/**
 * ===============
 * START-ROUTING
 * ===============
 */
var byActivity = express.Router({mergeParams:true});
projects.use('/byActivity', byActivity);
/**
 * Find by activityId
 */
byActivity.get('/', function (req, res) {
    console.log('Get by activityId');
    var id = req.query.activityId;
    Model.findOne({'activities._id': id}).populate({path: 'activities', populate: {path: 'values metrics'}}).exec(function (err, project) {
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
 * ===============
 * END-ROUTING
 * ===============
 */

/**
 * List of all projects
 */
projects.get('/', function (req, res) {
    console.log('Get all projects');
    Model.find({}).populate('activities').exec(function (err, list) {
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
projects.get('/:id', function (req, res) {
    console.log('Get by id');
    var id = req.params.id;
    Model.findOne({_id: id}).populate({path: 'activities', populate: {path: 'values metrics'}}).exec(function (err, project) {
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
 * Create new project
 */
projects.post('/', function (req, res) {
    console.log('About to save project');
    var project = new Model({
        name: req.body.name,
        description: req.body.description
    });
    project.save(function (err, project) {
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

/**
 * Update
 */
projects.put('/:id', function (req, res) {
    var id = req.params.id;
    console.log('Update project with id ' + id);
    Model.findByIdAndUpdate({_id: id},
        req.body,
        {upsert: true, safe: true},
        function (err, project) {
            if (err) {
                console.log('Err ' + err);
                return res.status(500).json({
                    message: 'Error updating',
                    error: err
                });
            }
            else if (!project) {
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
projects.delete('/:id', function (req, res) {
    var id = req.params.id;
    console.log('About to delete project ' + id);
    Model.findOne({_id: id}, function (err, project) {
        if (err) {
            return res.status(500).json({
                message: 'Error finding object'
            });
        }
        if (!project) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        project.remove(function (err) {
            if (err) {
                return res.status(500).json({
                    message: 'Error deleting'
                });
            }
            return res.json({message: 'Successfully deleted object'});
        });
    });
});




module.exports = projects;