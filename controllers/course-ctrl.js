var express = require('express');
var courses = express.Router();
var Model = require('../models/course.js');
const config = require('../app/config.js');


/**
 * List of all courses
 */
courses.get('/', function (req, res) {
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
courses.get('/:id', function (req, res) {
    var id = req.params.id;
    Model.findOne({_id: id}, function (err, course) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting object'
            });
        }
        if (!course) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        return res.json(course);
    });
});


/**
 * Create new course
 */
courses.post('/', function (req, res) {
    console.log('About to save course');
    var course= new Model({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday
    });
    course.save(function (err, user) {
        if (err) {
            console.log('Error saving course '+err);
            return res.status(500).json({
                message: 'Error when saving',
                error: err
            });
        }
        else{
            console.log('Successfully saved course '+err);
        return res.json({
            message: 'saved',
            _id: course._id
        });
        }
    });
});

/**
 * Update
 */
courses.put('/:id', function (req, res) {
    var id = req.params.id;
    console.log('Update course with id '+id);
    Model.findOne({_id: id}, function (err, course) {
        if (err) {
            return res.status(500).json({
                message: 'Error updating',
                error: err
            });
        }
        else if (!course) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        else {
            course.firstName = req.body.firstName? req.body.firstName: course.firstName;
            course.lastName = req.body.lastName ? req.body.lastName : course.lastName;
            course.email = req.body.email? req.body.email : course.email;
            course.birthday= req.body.birthday ? req.body.birthday : course.birthday;
            course.save(function (err, course) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error saving'
                    });
                }
                else if (!course) {
                    return res.status(404).json({
                        message: 'Not found'
                    });
                }
                else {
                    return res.json(course);
                }
            });
        }
    });
});


/**
 * Delete by id
 */
courses.delete('/:id', function (req, res) {
    var id = req.params.id;
    console.log('About to delete course '+id);
    Model.findOne({_id: id}, function (err, course) {
        if (err) {
            return res.status(500).json( {
                message: 'Error finding object'
            });
        }
        if (!course) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        course.remove(function(err) {
            if (err) {
                return res.status(500).json({
                    message: 'Error deleting'
                });
            }
            return res.json({message:'Successfully deleted object'});
        });
    });
});



module.exports = courses;