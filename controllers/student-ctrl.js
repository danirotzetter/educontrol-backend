var express = require('express');
var students = express.Router();
var Model = require('../models/student.js');
const config = require('../app/config.js');


/**
 * List of all students
 */
students.get('/', function (req, res) {
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
 * Create new student
 */
students.post('/', function (req, res) {
    var student= new Model({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday
    });
    student.save(function (err, user) {
        if (err) {
            return res.status(500).json({
                message: 'Error when saving',
                error: err
            });
        }
        return res.json({
            message: 'saved',
            _id: student._id
        });
    });
});

/**
 * Update
 */
students.put('/:id', function (req, res) {
    var id = req.params.id;
    Model.findOne({_id: id}, function (err, student) {
        if (err) {
            return res.status(500).json({
                message: 'Error updating',
                error: err
            });
        }
        else if (!student) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        else {
            student.firstName = req.body.firstName? req.body.firstName: student.firstName;
            student.lastName = req.body.lastName ? req.body.lastName : student.lastName;
            student.birthday= req.body.birthday ? req.body.birthday : student.birthday;
            student.save(function (err, student) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error saving'
                    });
                }
                else if (!student) {
                    return res.status(404).json({
                        message: 'Not found'
                    });
                }
                else {
                    return res.json(student);
                }
            });
        }
    });
});

/**
 * Find user by id
 */
students.get('/:id', function (req, res) {
    var id = req.params.id;
    Model.findOne({_id: id}, function (err, student) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting object'
            });
        }
        if (!student) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        return res.json(student);
    });
});


/**
 * Delete by id
 */
students.delete('/:id', function (req, res) {
    var id = req.params.id;
    Model.findOne({_id: id}, function (err, student) {
        if (err) {
            return res.status(500).json( {
                message: 'Error deleting'
            });
        }
        if (!student) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        return res.json(student);
    });
});



module.exports = students;