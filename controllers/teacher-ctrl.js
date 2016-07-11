var express = require('express');
var teachers = express.Router();
var Model = require('../models/teacher.js');
const config = require('../app/config.js');


/**
 * List of all teachers
 */
teachers.get('/', function (req, res) {
    Model.find(function (err, list) {
        if (err) {
            return res.json(500, {
                message: 'Error getting users.'
            });
        }
        return res.json(list);
    });
});


/**
 * Find user by id
 */
teachers.get('/:id', function (req, res) {
    var id = req.params.id;
    Model.findOne({_id: id}, function (err, teacher) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting object'
            });
        }
        if (!teacher) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        return res.json(teacher);
    });
});


/**
 * Create new teacher
 */
teachers.post('/', function (req, res) {
    console.log('About to save teacher');
    var teacher= new Model({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        location: req.body.location
    });
    teacher.save(function (err, user) {
        if (err) {
            console.log('Error saving teacher '+err);
            return res.status(500).json({
                message: 'Error when saving',
                error: err
            });
        }
        else{
            console.log('Successfully saved teacher '+err);
        return res.json({
            message: 'saved',
            _id: teacher._id
        });
        }
    });
});

/**
 * Update
 */
teachers.put('/:id', function (req, res) {
    var id = req.params.id;
    console.log('Update teacher with id '+id);
    Model.findOne({_id: id}, function (err, teacher) {
        if (err) {
            return res.status(500).json({
                message: 'Error updating',
                error: err
            });
        }
        else if (!teacher) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        else {
            teacher.firstName = req.body.firstName? req.body.firstName: teacher.firstName;
            teacher.lastName = req.body.lastName ? req.body.lastName : teacher.lastName;
            teacher.email = req.body.email? req.body.email : teacher.email;
            teacher.location = req.body.location ? req.body.location : teacher.location;
            teacher.save(function (err, teacher) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error saving'
                    });
                }
                else if (!teacher) {
                    return res.status(404).json({
                        message: 'Not found'
                    });
                }
                else {
                    return res.json(teacher);
                }
            });
        }
    });
});


/**
 * Delete by id
 */
teachers.delete('/:id', function (req, res) {
    var id = req.params.id;
    console.log('About to delete teacher '+id);
    Model.findOne({_id: id}, function (err, teacher) {
        if (err) {
            return res.status(500).json( {
                message: 'Error finding object'
            });
        }
        if (!teacher) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        teacher.remove(function(err) {
            if (err) {
                return res.status(500).json({
                    message: 'Error deleting'
                });
            }
            return res.json({message:'Successfully deleted object'});
        });
    });
});



module.exports = teachers;